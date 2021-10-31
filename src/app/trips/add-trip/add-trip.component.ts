import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-add-trip',
  template: `<section>
    <travel-log-card
      title="Add a new trip"
      icon="flight_takeoff"
      [progressBarCondition]="
        newTripForm.submitted && newTripForm.form.status === 'VALID'
      "
    >
      <form fxLayout="column" fxLayoutGap="25px" #newTripForm="ngForm">
        <mat-form-field appearance="outline">
          <!-- Name -->
          <mat-label>Trip name</mat-label>
          <input
            matInput
            ngModel
            type="text"
            name="name"
            id="name"
            #nameInput="ngModel"
            maxlength="50"
            required
          />
          <mat-hint align="end">{{ nameInput.value?.length || 0 }}/50</mat-hint>
          <mat-error *ngIf="nameInput.hasError('required')"
            >Cannot be empty</mat-error
          >
        </mat-form-field>
        <!-- Date range picker -->
        <mat-form-field appearance="fill">
          <mat-label>Trip period</mat-label>
          <mat-date-range-input
            [rangePicker]="tripRange"
            [max]="maxDate"
            [min]="minDate"
          >
            <input matStartDate placeholder="Start date" />
            <input matEndDate placeholder="End date" />
          </mat-date-range-input>
          <mat-datepicker-toggle
            matSuffix
            [for]="tripRange"
          ></mat-datepicker-toggle>
          <mat-date-range-picker #tripRange></mat-date-range-picker>
        </mat-form-field>
        <!-- Cities visited -->
        <travel-log-cities-chips></travel-log-cities-chips>

        <!-- Submit button -->
        <button
          mat-raised-button
          type="submit"
          color="primary"
          [disabled]="newTripForm.invalid"
        >
          Add
        </button>
      </form>
    </travel-log-card>
  </section>`,
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  maxDate: Date;
  minDate: Date;
  citiesList = '';
  constructor() {
    const currentYear: number = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 3, 11, 31);
    this.minDate = new Date(currentYear - 80, 0, 1);
  }

  ngOnInit(): void {
    // console.log(this.citiesList);
  }
}
