import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'travel-log-add-trip',
  template: `<section>
    <!-- [progressBarCondition]="
        newTripForm.submitted && newTripForm.form.status === 'VALID'
      " -->
    <travel-log-card title="Add a new trip" icon="flight_takeoff">
      <form
        fxLayout="column"
        fxLayoutGap="25px"
        [formGroup]="newTripForm"
        (ngSubmit)="onSubmit()"
      >
        <!-- Countries visited -->
        <travel-log-chips-input
          label="Countries visited"
          placeholder="Add country…"
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
          placeholder="Add city…"
          [els]="citiesInput"
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
    {{ newTripForm.value | json }}
  </section>`,
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  newTripForm: FormGroup;
  nameInput: string;
  citiesInput = [];
  countriesInput = [];
  constructor(
    private tripsService: TripsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.newTripForm = new FormGroup({
      name: new FormControl(this.nameInput),
      cities: new FormControl(this.citiesInput),
      countries: new FormControl(this.countriesInput),
      dates: new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null),
      }),
    });
  }

  onSubmit() {
    this.tripsService.addTripToFirebase({
      ...this.newTripForm.value,
    });
  }
}
