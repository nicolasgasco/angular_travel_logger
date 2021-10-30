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
    <mat-tab-group>
      <mat-tab label="First">
        <mat-card-title>Title</mat-card-title>
        <mat-card-subtitle>Subtitle</mat-card-subtitle>
        <mat-card-content>
          <p>Content</p>
        </mat-card-content></mat-tab
      >
      <mat-tab label="Second">
        <mat-card-content>
          <p>Content 2</p>
        </mat-card-content>
      </mat-tab>
    </mat-tab-group>
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
  @Input() tripData: { id: number };
  @Output() onDeleteTrip = new EventEmitter();

  deleteTrip = () => {
    this.onDeleteTrip.emit(this.tripData.id);
  };
}
