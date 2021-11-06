import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TripData } from '../trip-data.interface';
import { TripsService } from '../trips.service';

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

  constructor(private tripsService: TripsService) {
    console.log(this.tripsService.trips);
    this.trips = this.tripsService.trips;
  }

  deleteTripById = (e: any) => {
    this.deleteTripById(e.target.value.id);
  };

  ngOnInit(): void {}
}
