import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TripData } from 'src/app/trips/trip-data.interface';

@Component({
  selector: 'travel-log-trip-card',
  template: `
    <mat-card id="trip-card">
      <mat-card-title>{{
        tripData.name ? tripData.name : tripData.countries.join(', ')
      }}</mat-card-title>
      <mat-card-subtitle>
        {{ tripData.dates.start.getFullYear() }}
        <span
          *ngIf="
            tripData.dates.start.getFullYear() !==
            tripData.dates.end.getFullYear()
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
                {{ city.charAt(0).toUpperCase() + city.slice(1) }}
              </mat-list-item>
            </mat-list>
          </mat-tab>
          <!-- Map tab -->
          <mat-tab label="Map">
            <p>Map</p>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
      <mat-card-actions
        id="edit-buttons"
        fxLayout="row"
        fxLayoutAlign="end center"
      >
        <travel-log-card-actions
          (deleteTrip)="deleteTrip()"
        ></travel-log-card-actions>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./trip-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripCardComponent {
  @Input() tripData: TripData;
  @Output() onDeleteTrip = new EventEmitter();

  deleteTrip = () => {
    this.onDeleteTrip.emit(this.tripData.id);
  };
}
