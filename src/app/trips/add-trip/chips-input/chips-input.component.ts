import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'travel-log-chips-input',
  template: `
    <mat-form-field class="els-chip-list" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <mat-chip-list #chipList required>
        <mat-chip
          *ngFor="let el of els"
          [selectable]="selectable"
          [removable]="removable"
          (removed)="remove(el)"
        >
          {{ el }}
          <button matChipRemove *ngIf="removable">
            <mat-icon>cancel</mat-icon>
          </button>
        </mat-chip>
        <input
          [placeholder]="placeholder"
          #elInput
          matInput
          required
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
        />
      </mat-chip-list>
      <!-- <mat-error *ngIf="elInput.hasError('required')"
        >Cannot be empty</mat-error
      > -->
    </mat-form-field>
  `,
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent {
  @Input() label: string;
  @Input() placeholder: string;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  elCtrl = new FormControl();
  filteredCities: Observable<string[]>;
  @Input() els: string[] = [];
  allEls: string[] = [];

  @ViewChild('elInput') elInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredCities = this.elCtrl.valueChanges.pipe(
      startWith(null),
      map((el: string | null) => (el ? this._filter(el) : this.allEls.slice()))
    );
  }

  add(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    value = value.charAt(0).toUpperCase() + value.slice(1);

    // Add our el
    if (value) {
      this.els.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.elCtrl.setValue(null);
  }

  remove(el: string): void {
    const index = this.els.indexOf(el);

    if (index >= 0) {
      this.els.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.els.push(event.option.viewValue);
    this.elInput.nativeElement.value = '';
    this.elCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEls.filter((el) => el.toLowerCase().includes(filterValue));
  }
}
