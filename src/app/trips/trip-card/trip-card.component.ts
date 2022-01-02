import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TripData } from 'src/app/interfaces/trip-data.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'travel-log-trip-card',
  template: `
    <mat-card id="trip-card">
      <mat-card-title>{{
        tripData.name
          ? capitalizeFirstLetter(tripData.name)
          : capitalizeFirstLetter(tripData.countries.join(', '))
      }}</mat-card-title>
      <mat-card-subtitle>
        {{ tripData.dates.start.toDate().getFullYear() }}
        <span
          *ngIf="
            tripData.dates.start.toDate().getFullYear() !==
            tripData.dates.end.toDate().getFullYear()
          "
        >
          - {{ tripData.dates.start.getFullYear() }}</span
        >
      </mat-card-subtitle>
      <mat-card-content>
        <mat-tab-group>
          <!-- Cities tab -->
          <mat-tab label="Cities">
            <mat-list role="list">
              <mat-list-item
                role="listitem"
                *ngFor="let city of tripData.cities"
              >
                {{ capitalizeFirstLetter(city) }}
              </mat-list-item>
            </mat-list>
          </mat-tab>
          <!-- Map tab -->
          <mat-tab label="Diary">
            <p>Diary</p>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
      <mat-card-actions
        id="edit-buttons"
        fxLayout="row"
        fxLayoutAlign="end center"
      >
        <div class="actions-container">
          <!-- <button mat-icon-button aria-label="Edit trip">
            <mat-icon id="edit-icon">mode_edit</mat-icon>
          </button> -->
          <button
            color="warn"
            mat-icon-button
            aria-label="Delete trip"
            (click)="tripsService.removeTripFromFirebase(tripData.id)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent {
  @Input() tripData: TripData;
  @Output() onDeleteTrip = new EventEmitter();

  constructor(public tripsService: TripsService) {}

  // Capitalize every word of multiword strings
  capitalizeFirstLetter = (words: string) => {
    return words
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // deleteTrip = () => {
  //   this.onDeleteTrip.emit(this.tripData.id);
  // };
}
