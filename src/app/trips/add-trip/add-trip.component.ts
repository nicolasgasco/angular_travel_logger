import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TripData } from 'src/app/interfaces/trip-data.interface';
import { ModalComponentDialog } from 'src/app/layout/modal/modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'travel-log-add-trip',
  template: `<section
    fxLayout="column"
    fxLayoutAlign="center center"
    fxLayoutGap="25px"
  >
    <!-- [progressBarCondition]="
        newTripForm.submitted && newTripForm.form.status === 'VALID'
      " -->
    <travel-log-card
      [title]="editMode ? 'Edit your trip details' : 'Add a new trip'"
      [icon]="editMode ? 'edit' : 'flight_takeoff'"
    >
      <form
        fxLayout="column"
        fxLayoutGap="25px"
        [formGroup]="newTripForm"
        (ngSubmit)="onSubmit()"
      >
        <!-- Countries visited -->
        <travel-log-chips-input
          label="Countries visited"
          placeholder="Use comma to separate values…"
          [els]="countriesInput"
        ></travel-log-chips-input>
        <mat-form-field appearance="outline">
          <!-- Name -->
          <mat-label>Trip name</mat-label>
          <input
            matInput
            type="text"
            name="name"
            id="name"
            maxlength="30"
            formControlName="name"
            placeholder="Leave blank for default..."
            #nameInput
          />
          <mat-hint align="end"
            >{{ newTripForm.controls.name.value?.length || 0 }}/30</mat-hint
          >
        </mat-form-field>
        <!-- Date range picker -->
        <travel-log-trip-date-picker
          [datesFormGroup]="newTripForm.controls.dates"
        ></travel-log-trip-date-picker>
        <!-- Cities visited -->
        <travel-log-chips-input
          label="Cities visited"
          placeholder="Use comma to separate values…"
          [els]="citiesInput"
        ></travel-log-chips-input>

        <!-- Journal button -->
        <button
          mat-flat-button
          color="primary"
          [disabled]="newTripForm.invalid"
          *ngIf="!showJournalForm; else journalForm"
          (click)="onStartingJournal()"
        >
          {{ editMode ? 'Edit a journal entry' : 'Write new journal entry' }}
        </button>
        <ng-template #journalForm>
          <travel-log-journal-form
            [dates]="dates"
            [journalEntries]="journal"
            (addNewEntry)="addNewJournalEntry($event)"
          ></travel-log-journal-form>
        </ng-template>
        <!-- Submit button -->
        <button
          mat-raised-button
          type="submit"
          color="accent"
          [disabled]="isFormValid()"
        >
          {{ editMode ? 'Edit and close trip' : 'Save and close trip' }}
        </button>
      </form>
    </travel-log-card>
    <ng-container>
      <a fxLayout fxLayoutAlign="center center" routerLink="/all-trips"
        ><mat-icon>arrow_back</mat-icon> Back to your trips</a
      >
    </ng-container>
  </section>`,
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  @Input() editMode? = false;
  newTripForm: FormGroup;
  showJournalForm = false;
  dates = [];
  journal: any[];
  citiesInput: string[];
  countriesInput: string[];

  constructor(
    public tripsService: TripsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.journal = this.editMode ? this.tripsService.tripToEdit.journal : [];
    this.citiesInput = this.editMode ? this.tripsService.tripToEdit.cities : [];
    this.countriesInput = this.editMode
      ? this.tripsService.tripToEdit.countries
      : [];

    this.newTripForm = new FormGroup({
      name: new FormControl(
        this.editMode ? this.tripsService.tripToEdit.name : ''
      ),
      cities: new FormControl(this.citiesInput),
      countries: new FormControl(this.countriesInput),
      dates: new FormGroup({
        start: new FormControl(
          this.editMode ? this.tripsService.tripToEdit.dates.start : null
        ),
        end: new FormControl(
          this.editMode ? this.tripsService.tripToEdit.dates.end : null
        ),
      }),
    });
  }

  isFormValid() {
    return (
      this.newTripForm.invalid ||
      this.newTripForm.controls.countries.value.length === 0 ||
      this.newTripForm.controls.cities.value.length === 0 ||
      this.showJournalForm
    );
  }

  onSubmit() {
    const tripData = {
      ...this.newTripForm.value,
      journal: this.journal,
    };

    if (!this.editMode) {
      this.tripsService.addTripToFirebase(tripData);
    } else {
      this.tripsService.editTripOnFirebase({
        ...tripData,
        id: this.tripsService.tripToEdit.id,
      });
    }
  }

  onStartingJournal() {
    this.showJournalForm = !this.showJournalForm;
    this._createDatesArray();
  }

  _createDatesArray() {
    let loop = new Date(this.newTripForm.value.dates.start - 1);
    while (loop <= this.newTripForm.value.dates.end) {
      this.dates.push(loop);
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
  }

  addNewJournalEntry(journalEntryData: { day: Date; entry: string }) {
    this.showJournalForm = !this.showJournalForm;
    this.journal = this.journal.filter((journalEntry) => {
      return (
        journalEntry.day.getMonth() !== journalEntryData.day.getMonth() ||
        journalEntry.day.getDay() !== journalEntryData.day.getDay()
      );
    });
    this.journal.push(journalEntryData);
  }
}
