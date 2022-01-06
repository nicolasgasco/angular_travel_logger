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
              this.trips = fetchedTrips;
              this.tripsChanged.next([...this.trips]);
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        this.router.navigate(['/']);
        console.log('User is not logged');
      }
    });
  }

  addTripToFirebase(trip: TripData) {
    this.angularFireAuth.authState.subscribe((userData) => {
      if (userData) {
        this.db
          .collection('users')
          .doc(userData.uid)
          .collection('savedTrips')
          .add(trip);

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
        this.angularFireAuth.authState.subscribe((userData) => {
          if (userData) {
            this.db
              .collection('users')
              .doc(userData.uid)
              .collection('savedTrips')
              .doc(tripId)
              .valueChanges()
              .subscribe((tripToBeDeleted) => {
                console.log(tripToBeDeleted);

                this.db
                  .collection('users')
                  .doc(userData.uid)
                  .collection('deletedTrips')
                  .add(tripToBeDeleted);

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
    });
  }

  editTripOnFirebase(tripData: TripData) {
    const tripId = tripData.id;
    delete tripData.id;
    this.db
      .collection('users')
      .doc(this.userId)
      .collection('savedTrips')
      .doc(tripId)
      .update(tripData)
      .then((result) => {
        console.log(result);
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

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe);
  }

  saveTripToEdit(tripData: TripData) {
    this.tripToEdit = tripData;
  }
}
