import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { TripData } from '../interfaces/trip-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  constructor(private db: AngularFirestore) {}

  trips: TripData[] = [];
  tripsChanged = new Subject<TripData[]>();

  addTrip(tripData: TripData) {
    // Parsing dates from string
    // console.log(typeof tripData.dates.start);
    // this.trips.push(tripData);
    // this.id++;
    // this.saveLocalStorage();
  }

  fetchTripsFromFirebase() {
    return this.db
      .collection('savedTrips')
      .snapshotChanges()
      .map((tripsArray) => {
        return tripsArray.map((trip) => {
          const tripWithId = trip.payload.doc.data();
          tripWithId['id'] = trip.payload.doc.id;
          return tripWithId;
        });
      })
      .subscribe((fetchedTrips: TripData[]) => {
        this.trips = fetchedTrips;
        this.tripsChanged.next([...this.trips]);
      });
  }

  addDataToFirebase(trip: TripData) {
    console.log(trip);
    this.db.collection('savedTrips').add(trip);
  }

  saveLocalStorage() {
    // localStorage.setItem('trips', JSON.stringify(this.trips));
  }

  deleteTrip(id: string) {
    // console.log(`id is ${id}`);
    // this.trips = this.trips.filter((trip) => trip.id !== id);
    // this.saveLocalStorage();
  }
}
