import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

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
      <form
        fxLayout="column"
        fxLayoutGap="25px"
        #newTripForm="ngForm"
        (submit)="onSubmitNewTrip(newTripForm)"
      >
        <!-- Countries visited -->
        <travel-log-chips-input
          label="Countries visited"
          placeholder="Add country…"
        ></travel-log-chips-input>
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
            maxlength="30"
          />
          <mat-hint align="end">{{ nameInput.value?.length || 0 }}/30</mat-hint>
        </mat-form-field>
        <!-- Date range picker -->
        <travel-log-trip-date-picker></travel-log-trip-date-picker>
        <!-- Cities visited -->
        <travel-log-chips-input
          label="Cities visited"
          placeholder="Add city…"
        ></travel-log-chips-input>

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
  constructor() {}

  ngOnInit(): void {
    // console.log(this.citiesList);
  }

  onSubmitNewTrip(form: NgForm) {
    console.log(form);
  }
}
