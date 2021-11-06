import { Injectable } from '@angular/core';
import { TripData } from './trip-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  trips: TripData[] = [];
  id = 1;

  constructor() {}

  addTrip(tripData: TripData) {
    this.trips.push(tripData);
    this.id++;
  }

  deleteTrip(id: number) {
    console.log(`id is ${id}`);
    this.trips = this.trips.filter((trip) => trip.id !== id);
  }
}
