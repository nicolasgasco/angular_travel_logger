import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { TripData } from '../interfaces/trip-data.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {}

  trips: TripData[] = [];
  tripsChanged = new Subject<TripData[]>();
  private fbSubs: Subscription[];

  addTrip(tripData: TripData) {
    // Parsing dates from string
    // console.log(typeof tripData.dates.start);
    // this.trips.push(tripData);
    // this.id++;
    // this.saveLocalStorage();
  }

  fetchTripsFromFirebase() {
    this.angularFireAuth.authState.subscribe((userData) => {
      if (userData) {
        this.db
          .collection('users')
          .doc(userData.uid)
          .collection('savedTrips')
          .snapshotChanges()
          .map((tripsArray) => {
            return tripsArray.map((trip) => {
              const tripWithId = trip.payload.doc.data();
              tripWithId['id'] = trip.payload.doc.id;
              return tripWithId;
            });
          })
          .subscribe(
            (fetchedTrips: TripData[]) => {
              this.trips = fetchedTrips;
              this.tripsChanged.next([...this.trips]);
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        console.log('User is not logged');
      }
    });
  }

  addDataToFirebase(trip: TripData) {
    this.angularFireAuth.authState.subscribe((userData) => {
      if (userData) {
        this.db
          .collection('users')
          .doc(userData.uid)
          .collection('savedTrips')
          .add(trip);
      } else {
        console.log('User is not logged');
      }
    });
  }

  saveLocalStorage() {
    // localStorage.setItem('trips', JSON.stringify(this.trips));
  }

  deleteTrip(id: string) {
    // console.log(`id is ${id}`);
    // this.trips = this.trips.filter((trip) => trip.id !== id);
    // this.saveLocalStorage();
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe);
  }
}
