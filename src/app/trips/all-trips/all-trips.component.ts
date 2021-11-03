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
      {
        id: 2,
        countries: ['Italy, France'],
        start: new Date(1995, 11),
        end: new Date(1996, 0),
        cities: ['City1', 'City2', 'City3'],
      },
      {
        id: 1,
        countries: ['USA'],
        start: new Date('2009'),
        end: new Date('2009'),
        cities: ['City1'],
      },
      {
        id: 3,
        countries: ['Germany, Austria, Switzerland'],
        start: new Date(),
        end: new Date(),
        cities: ['City1', 'City2', 'City3'],
      },
    ];
  }

  deleteTripById = (e: any) => {
    this.trips = this.trips.filter((trip) => trip.id !== e);
  };

  ngOnInit(): void {}
}
