import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  </mat-card>`,
  styleUrls: ['./trip-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
