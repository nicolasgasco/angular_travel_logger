import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'travel-log-all-trips',
  template: `
    <section>
      <div class="cards-container">
        <travel-log-trip-card *ngFor="let trip of trips"></travel-log-trip-card>
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
