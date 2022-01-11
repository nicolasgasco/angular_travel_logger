import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { TripData } from '../interfaces/trip-data.interface';
import { ModalComponentDialog } from '../layout/modal/modal.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  trips: TripData[] = [];
  tripsChanged = new Subject<TripData[]>();
  private fbSubs: Subscription[];
  tripsLoading = false;
  tripToEdit: TripData;
  userId: string;

  fetchTripsFromFirebase() {
    this.angularFireAuth.authState.subscribe((userData) => {
      if (userData) {
        this.userId = userData.uid;
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
              this._convertObsToDates(fetchedTrips);
              // Trips for test user are saved on LocalStorage and not db
              if (this.userId === 'WAIR22NMwRTekWYaX7HufKe6ajF2') {
                const localStorageTrips = JSON.parse(
                  localStorage.getItem('tripsData')
                );
                // if trips stored in localStorage
                if (localStorageTrips && localStorageTrips.length > 0) {
                  this._convertObsToDates(localStorageTrips);
                  this.trips = localStorageTrips;
                  this.tripsChanged.next([...this.trips]);
                } else {
                  localStorage.setItem(
                    'tripsData',
                    JSON.stringify(fetchedTrips)
                  );
                  this.trips = fetchedTrips;
                  this.tripsChanged.next([...this.trips]);
                }
              } else {
                this.trips = fetchedTrips;
                this.tripsChanged.next([...this.trips]);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        localStorage.clear();
        this.router.navigate(['/']);
        console.log('User is not logged');
      }
    });
  }

  _convertObsToDates(trips: TripData[]) {
    trips.map((trip) => {
      if (typeof trip.dates.start === 'string') {
        trip.dates.start = new Date(trip.dates.start);
        trip.dates.end = new Date(trip.dates.end);
        trip.journal.map((entry) => {
          entry.day = new Date(entry.day);
        });
      } else {
        trip.dates.start = new Date(trip.dates.start.seconds * 1000);
        trip.dates.end = new Date(trip.dates.end.seconds * 1000);
        trip.journal.map((entry) => {
          entry.day = new Date(entry.day['seconds'] * 1000);
        });
      }
    });
  }

  addTripToFirebase(trip: TripData) {
    this.angularFireAuth.authState.subscribe((userData) => {
      if (userData) {
        // Save to LocalStorage for test user
        if (this.userId === 'WAIR22NMwRTekWYaX7HufKe6ajF2') {
          const localStorageTrips = JSON.parse(
            localStorage.getItem('tripsData')
          );
          localStorageTrips.push(trip);
          localStorage.setItem('tripsData', JSON.stringify(localStorageTrips));
        } else {
          this.db
            .collection('users')
            .doc(userData.uid)
            .collection('savedTrips')
            .add(trip);
        }
        const dialogRef = this.dialog.open(ModalComponentDialog, {
          data: {
            modalTitle: 'Your trip was successfully added!',
          },
        });
        this.router.navigate(['/all-trips']);
      } else {
        this.router.navigate(['/']);
        console.log('User is not logged');
      }
    });
  }

  removeTripFromFirebase(tripId: string) {
    const dialogRef = this.dialog.open(ModalComponentDialog, {
      data: {
        modalTitle: 'Do you really want to deleted this trip?',
        modalText: 'This action cannot be undone.',
        mainButtonText: 'Confirm',
        secondaryButtonText: 'Cancel',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // If you press on confirm
      if (result) {
        if (this.userId === 'WAIR22NMwRTekWYaX7HufKe6ajF2') {
          this.trips = this.trips.filter((trip) => trip.id !== tripId);
          localStorage.setItem('tripsData', JSON.stringify(this.trips));
          this.tripsChanged.next([...this.trips]);
        } else {
          this.angularFireAuth.authState.subscribe((userData) => {
            if (userData) {
              this.db
                .collection('users')
                .doc(userData.uid)
                .collection('savedTrips')
                .doc(tripId)
                .valueChanges()
                .subscribe((tripToBeDeleted) => {
                  this.db
                    .collection('users')
                    .doc(userData.uid)
                    .collection('savedTrips')
                    .doc(tripId)
                    .delete();
                });
            } else {
              console.log('User is not logged');
            }
          });
        }
      }
    });
  }

  editTripOnFirebase(tripData: TripData) {
    const tripId = tripData.id;
    if (this.userId === 'WAIR22NMwRTekWYaX7HufKe6ajF2') {
      const filteredTrips = JSON.parse(
        localStorage.getItem('tripsData')
      ).filter((trip) => trip.id !== tripId);
      filteredTrips.push(tripData);
      localStorage.setItem('tripsData', JSON.stringify(filteredTrips));

      const dialogRef = this.dialog.open(ModalComponentDialog, {
        data: {
          modalTitle: 'Your trip details were updated successfully!',
        },
      });
      this.router.navigate(['/all-trips']);
    } else {
      delete tripData.id;
      this.db
        .collection('users')
        .doc(this.userId)
        .collection('savedTrips')
        .doc(tripId)
        .update(tripData)
        .then((result) => {
          const dialogRef = this.dialog.open(ModalComponentDialog, {
            data: {
              modalTitle: 'Your trip details were updated successfully!',
            },
          });
          this.router.navigate(['/all-trips']);
        })
        .catch((error) => {
          const dialogRef = this.dialog.open(ModalComponentDialog, {
            data: {
              modalTitle: 'An error ocurred!',
              modalText: "Your trip details weren't updated",
            },
          });
          this.router.navigate(['/all-trips']);
        });
    }
  }

  cancelSubscriptions() {
    if (this.fbSubs) {
      this.fbSubs.forEach((sub) => sub.unsubscribe);
    }
  }

  saveTripToEdit(tripData: TripData) {
    this.tripToEdit = tripData;
  }
}
