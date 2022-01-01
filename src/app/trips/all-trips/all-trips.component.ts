import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TripData } from '../trip-data.interface';
import { TripsService } from '../trips.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'travel-log-all-trips',
  template: `
    <section>
      <div *ngIf="tripsLoading; else finishedLoading">Show loader here...</div>
      <ng-template #finishedLoading>
        <div
          class="cards-container"
          *ngIf="trips.length && trips.length > 0; else noTrips"
        >
          <travel-log-trip-card
            *ngFor="let trip of trips"
            [tripData]="trip"
            (onDeleteTrip)="deleteTripById($event)"
          ></travel-log-trip-card>
        </div>
        <ng-template #noTrips>
          <div>Ciao</div>
        </ng-template></ng-template
      >
    </section>
  `,
  styleUrls: ['./all-trips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllTripsComponent implements OnInit, OnDestroy {
  trips: TripData[];
  tripsSubscription: Subscription;
  tripsLoading: Boolean = true;

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
      (savedTrips) => {
        this.trips = savedTrips;
        this.tripsLoading = false;
      }
    );
    this.tripsService.fetchTripsFromFirebase();
  }

  ngOnDestroy(): void {
    this.tripsSubscription.unsubscribe();
  }
}
