import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'travel-log-cities-chips',
  template: `
    <mat-form-field class="cities-chip-list" appearance="outline">
      <mat-label>Cities visited</mat-label>
      <mat-chip-list #chipList aria-label="Fruit selection">
        <mat-chip
          *ngFor="let city of cities"
          [selectable]="selectable"
          [removable]="removable"
          (removed)="remove(city)"
        >
          {{ city }}
          <button matChipRemove *ngIf="removable">
            <mat-icon>cancel</mat-icon>
          </button>
        </mat-chip>
        <input
          placeholder="New city..."
          #cityInput
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
        />
      </mat-chip-list>
    </mat-form-field>
  `,
  styleUrls: ['./cities-chips.component.scss'],
})
export class CitiesChipsComponent {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cityCtrl = new FormControl();
  filteredCities: Observable<string[]>;
  cities: string[] = [''];
  allCities: string[] = [];

  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredCities = this.cityCtrl.valueChanges.pipe(
      startWith(null),
      map((city: string | null) =>
        city ? this._filter(city) : this.allCities.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our city
    if (value) {
      this.cities.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.cityCtrl.setValue(null);
  }

  remove(city: string): void {
    const index = this.cities.indexOf(city);

    if (index >= 0) {
      this.cities.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cities.push(event.option.viewValue);
    this.cityInput.nativeElement.value = '';
    this.cityCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCities.filter((city) =>
      city.toLowerCase().includes(filterValue)
    );
  }
}
