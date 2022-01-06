import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'travel-log-trip-date-picker',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Trip period</mat-label>
      <mat-date-range-input
        required
        [formGroup]="datesFormGroup"
        [rangePicker]="tripRange"
        [min]="minDate"
        [max]="maxDate"
      >
        <input
          matStartDate
          formControlName="start"
          placeholder="Start date"
          required
        />
        <input
          matEndDate
          formControlName="end"
          placeholder="End date"
          (ngModelChange)="onChange($event)"
        />
      </mat-date-range-input>
      <mat-datepicker-toggle
        matSuffix
        [for]="tripRange"
      ></mat-datepicker-toggle>
      <mat-date-range-picker #tripRange></mat-date-range-picker>

      <mat-error
        *ngIf="
          datesFormGroup.controls.start.hasError('required') ||
          datesFormGroup.controls.end.hasError('required')
        "
        >Cannot be empty</mat-error
      >
    </mat-form-field>
  `,
  styleUrls: ['./trip-date-picker.component.scss'],
})
export class TripDatePickerComponent implements OnInit {
  @Input() datesFormGroup: FormGroup;

  maxDate: Date;
  minDate: Date;

  constructor() {
    const currentYear: number = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 3, 11, 31);
    this.minDate = new Date(currentYear - 80, 0, 1);
  }

  ngOnInit(): void {}

  onChange(e) {}
}
