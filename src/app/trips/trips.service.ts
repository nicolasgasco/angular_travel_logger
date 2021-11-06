import { Injectable } from '@angular/core';
import { TripDatePickerComponent } from './add-trip/trip-date-picker/trip-date-picker.component';
import { TripData } from './trip-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  trips: TripData[] = this.getTrips();
  id = 4;

  constructor() {}

  addTrip(tripData: TripData) {
    // Parsing dates from string
    console.log(typeof tripData.dates.start);
    this.trips.push(tripData);
    this.id++;
    this.saveLocalStorage();
  }

  getTrips() {
    const localStorageTrips = JSON.parse(localStorage.getItem('trips'));
    if (localStorageTrips) {
      // Repeating new Date otherwise date methods won't work properly
      localStorageTrips.forEach((trip) => {
        Object.keys(trip.dates).forEach((dateKey) => {
          trip.dates[dateKey] = new Date(trip.dates[dateKey]);
        });
      });
      this.trips = localStorageTrips;
    }
    return [
      {
        id: 2,
        countries: ['Italy, France'],
        dates: {
          start: new Date('1995-02'),
          end: new Date('1996-03'),
        },
        cities: ['City1', 'City2', 'City3'],
      },
      {
        id: 1,
        countries: ['USA'],
        dates: {
          start: new Date('1995-02'),
          end: new Date('1996-03'),
        },
        cities: ['City1'],
      },
      {
        id: 3,
        countries: ['Germany, Austria, Switzerland'],
        dates: {
          start: new Date(),
          end: new Date(),
        },
        cities: ['City1', 'City2', 'City3'],
      },
    ];
  }

  saveLocalStorage() {
    localStorage.setItem('trips', JSON.stringify(this.trips));
  }

  deleteTrip(id: number) {
    console.log(`id is ${id}`);
    this.trips = this.trips.filter((trip) => trip.id !== id);
    this.saveLocalStorage();
  }
}
