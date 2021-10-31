import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TripData } from '../trip-data.interface';

@Component({
  selector: 'travel-log-all-trips',
  template: `
    <section>
      <div class="cards-container">
        <travel-log-trip-card
          *ngFor="let trip of trips"
          [tripData]="trip"
          (onDeleteTrip)="deleteTripById($event)"
        ></travel-log-trip-card>
      </div>
    </section>
  `,
  styleUrls: ['./all-trips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllTripsComponent implements OnInit {
  trips: TripData[];

  constructor() {
    this.trips = [
      { id: 1, country: 'USA' },
      { id: 2, country: 'Italy' },
      { id: 3, country: 'Germany' },
    ];
  }

  deleteTripById = (e: any) => {
    this.trips = this.trips.filter((trip) => trip.id !== e);
  };

  ngOnInit(): void {}
}
