import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'travel-log-trip-card',
  template: ` <mat-card>
    <mat-card-title>{{ tripData.country }}</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
    <mat-card-content>
      <mat-tab-group>
        <mat-tab label="First">
          <p>Trip data</p>
        </mat-tab>
        <mat-tab label="Second">
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
  @Input() tripData: { id: number; country: string };
  @Output() onDeleteTrip = new EventEmitter();

  deleteTrip = () => {
    this.onDeleteTrip.emit(this.tripData.id);
  };
}
