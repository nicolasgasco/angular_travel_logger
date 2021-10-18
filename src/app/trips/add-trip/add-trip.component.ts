import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-add-trip',
  templateUrl: './add-trip.component.html',
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
    console.log(this.citiesList);
  }
}
