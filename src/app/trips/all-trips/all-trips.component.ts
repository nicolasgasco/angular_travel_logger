import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TripData } from '../trip-data.interface';
import { TripsService } from '../trips.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'travel-log-all-trips',
  template: `
    <section>
      <div class="cards-container">
        <travel-log-trip-card
          *ngFor="let trip of trips | async"
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
  trips: Observable<any>;

  constructor(
    private tripsService: TripsService,
    private db: AngularFirestore
  ) {
    // this.trips = this.tripsService.trips;
  }

  deleteTripById = (id: number) => {
    this.tripsService.deleteTrip(id);
    // this.trips = this.tripsService.trips;
  };

  ngOnInit(): void {
    this.trips = this.db.collection('savedTrips').valueChanges();
  }
}
