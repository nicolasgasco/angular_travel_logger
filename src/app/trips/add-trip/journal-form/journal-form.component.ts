import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TripData } from 'src/app/interfaces/trip-data.interface';

@Component({
  selector: 'travel-log-journal-form',
  template: `
    <h2>Journal entries</h2>
    <form [formGroup]="newJournalEntry" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Choose a day</mat-label>
        <mat-select
          matInput
          name="day"
          id="day"
          formControlName="day"
          #dayInput
          (selectionChange)="onDaySelection()"
        >
          <mat-option *ngFor="let date of dates; let i = index" [value]="date">
            Day {{ i + 1 }} -
            {{
              date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long'
              })
            }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      {{ journalEntries | json }}
      <ng-container *ngIf="dayInput.value">
        <mat-form-field appearance="fill">
          <mat-label>Write your journal entry</mat-label>
          <textarea
            matInput
            name="entry"
            id="entry"
            formControlName="entry"
            #entryInput
            [maxLength]="entryCharactersLength"
            placeholder="Make it short and meaningful…"
          ></textarea>
          <mat-hint align="end"
            >{{ entryInput.value.length || 0 }}/{{
              entryCharactersLength
            }}</mat-hint
          >
        </mat-form-field>
        <button
          type="submit"
          mat-flat-button
          color="primary"
          [disabled]="!entryInput.value"
        >
          Save journal entry
        </button>
      </ng-container>
    </form>
  `,
  styleUrls: ['./journal-form.component.scss'],
})
export class JournalFormComponent implements OnInit {
  @Input() dates: TripData;
  @Input() journalEntries: { id: number; entry: string; day: Date }[];
  @Output() addNewEntry = new EventEmitter<any>();
  newJournalEntry: FormGroup;
  dayInput: Date;
  entryInput: string;
  entryCharactersLength = 300;

  constructor() {}

  onSubmit() {
    this.addNewEntry.emit({
      ...this.newJournalEntry.value,
    });
  }

  onDaySelection() {
    const savedJournalEntry = this.journalEntries.filter((journalEntry) => {
      console.log(journalEntry.day);
      console.log(this.newJournalEntry.controls.day.value);
      if (journalEntry.day === this.newJournalEntry.controls.day.value) {
        return true;
      }
      return false;
    })[0];
    console.log(savedJournalEntry);
    if (savedJournalEntry)
      this.newJournalEntry.controls.entry.setValue(savedJournalEntry.entry);
  }

  ngOnInit(): void {
    this.newJournalEntry = new FormGroup({
      day: new FormControl(this.dayInput),
      entry: new FormControl(this.entryInput),
    });
  }
}
