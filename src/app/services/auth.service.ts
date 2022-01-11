import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth/auth-data.interface';
import { TripsService } from './trips.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentDialog } from '../layout/modal/modal.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  isAuthenticated = false;
  private user: User;
  welcomeModalShown = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private tripsService: TripsService,
    private dialog: MatDialog,
    private db: AngularFirestore
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.authSuccessful();
      } else {
        this.isAuthenticated = false;
        console.log('Goodbye');
        this.tripsService.cancelSubscriptions();
      }
    });
  }

  getLoggedUserId() {}

  // SIGNUP
  registerUser(authData: AuthData, form: NgForm) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((signupData) => {
        this.signupSuccessful(signupData);
      })
      .catch((error) => {
        this.signupFailure(error.message, form);
      });
  }

  private signupSuccessful(signupData: any) {
    localStorage.clear();
    console.log('Signup successful');
    this.db.collection('users').doc(signupData.user.uid).set({
      uid: signupData.user.uid,
      email: signupData.user.email,
      userSince: Date.now(),
    });
    this.isAuthenticated = true;
    this.router.navigate(['/add-trip']);
    const dialogRef = this.dialog.open(ModalComponentDialog, {
      data: {
        modalTitle: 'Signup successful',
        modalText: 'Your account was created. Add your first trip now!',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private signupFailure(error: string, form: NgForm) {
    console.log('Signup unsuccessful');
    this.isAuthenticated = false;
    form.resetForm();
    const dialogRef = this.dialog.open(ModalComponentDialog, {
      data: { modalTitle: 'Signup unsuccessful', modalText: error },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // LOGIN
  login(authData: AuthData, form: NgForm) {
    localStorage.clear();
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('Login successful');
        this.authSuccessful(result.user.uid);
      })
      .catch((error) => {
        this.loginFailure(error, form);
      });
  }

  isAuth() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

  logOut() {
    localStorage.clear();
    this.angularFireAuth.signOut();
    this.isAuthenticated = false;
    console.log('Goodbye');
    this.tripsService.cancelSubscriptions();
    // this.router.navigate(['/login']);
  }

  private loginFailure(error: any, form: NgForm) {
    console.log(`Login error: ${error.message}`);
    const dialogRef = this.dialog.open(ModalComponentDialog, {
      data: { modalTitle: 'Login unsuccessful', modalText: error.message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    form.resetForm();
  }

  private authSuccessful(uid?: string) {
    if (uid === 'WAIR22NMwRTekWYaX7HufKe6ajF2') {
      const dialogRef = this.dialog.open(ModalComponentDialog, {
        data: {
          modalTitle: 'Welcome!',
          modalText:
            "This is a sandbox account. Feel free to add, delete, and modify as you wish. Your changes won't be stored in the database",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
    this.isAuthenticated = true;
    this.router.navigate(['/all-trips']);
  }

  setWelcomeModalAsShown() {
    this.welcomeModalShown = true;
  }
}
