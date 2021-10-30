import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  trips: { id: number }[];

  constructor() {
    this.trips = [{ id: 1 }, { id: 2 }, { id: 3 }];
  }

  deleteTripById = (e: any) => {
    this.trips = this.trips.filter(trip => trip.id !== e)
  };

  ngOnInit(): void {}
}
