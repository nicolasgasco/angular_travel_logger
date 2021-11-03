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
  template: ` <mat-card>
    <mat-card-title>{{ tripData.countries.join(', ') }}</mat-card-title>
    <mat-card-subtitle
      >{{ tripData.start.getFullYear()
      }}<span
        *ngIf="tripData.start.getFullYear() !== tripData.end.getFullYear()"
      >
        - {{ tripData.start.getFullYear() }}</span
      ></mat-card-subtitle
    >
    <mat-card-content>
      <mat-tab-group>
        <mat-tab label="Cities">
          <p>{{ tripData.cities.join(', ') }}</p>
        </mat-tab>
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
  </mat-card>`,
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
