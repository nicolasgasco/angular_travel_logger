import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'travel-log-all-trips',
  template: `
    <section>
      <div class="cards-container">
        <mat-card *ngFor="let trip of trips">
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
        </mat-card>
      </div>
    </section>
  `,
  styleUrls: ['./all-trips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllTripsComponent implements OnInit {
  constructor() {}

  trips = [{}, {}, {}];

  ngOnInit(): void {}
}
