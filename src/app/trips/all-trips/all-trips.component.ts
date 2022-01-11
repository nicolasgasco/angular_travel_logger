import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TripData } from 'src/app/interfaces/trip-data.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'travel-log-all-trips',
  template: `
    <section>
      <ng-container *ngIf="!trips; else finishedLoading">
        <travel-log-spinner></travel-log-spinner>
      </ng-container>
      <ng-template #finishedLoading>
        <ng-container *ngIf="trips.length > 0; else noTrips">
          <h1 class="h1">Your trips</h1>
          <div class="cards-container" [class.single-trip]="trips.length === 1">
            <travel-log-trip-card
              *ngFor="let trip of _sortTrips(trips)"
              [tripData]="trip"
            ></travel-log-trip-card>
          </div>
        </ng-container>
        <ng-template #noTrips>
          <h1 id="no-trips-title" class="h1">There are no trips to show...</h1>
          <img
            class="no-trips-img"
            src="/assets/img/no_trips.svg"
            alt=""
          /> </ng-template
      ></ng-template>
    </section>
  `,
  styleUrls: ['./all-trips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllTripsComponent implements OnInit, OnDestroy {
  trips: TripData[];
  tripsSubscription: Subscription;

  constructor(public tripsService: TripsService) {}

  ngOnInit(): void {
    this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
      (savedTrips) => {
        this.trips = savedTrips;
        this.tripsService.tripsLoading = false;
      }
    );
    this.tripsService.fetchTripsFromFirebase();
  }

  ngOnDestroy(): void {
    this.tripsSubscription.unsubscribe();
  }

  _sortTrips(trips: TripData[]) {
    return trips.sort((a, b) => {
      return a['dates']['start'] > b['dates']['start'] ? 1 : -1;
    });
  }
}
