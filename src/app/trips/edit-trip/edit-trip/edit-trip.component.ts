import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'travel-log-edit-trip',
  template: ` <travel-log-add-trip [editMode]="true"></travel-log-add-trip> `,
})
export class EditTripComponent implements OnInit {
  constructor(public tripsService: TripsService) {}

  ngOnInit(): void {}
}
