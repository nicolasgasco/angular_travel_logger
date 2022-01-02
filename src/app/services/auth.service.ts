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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  isAuthenticated = false;
  private user: User;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private tripsService: TripsService,
    private dialog: MatDialog
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

  // SIGNUP
  registerUser(authData: AuthData, form: NgForm) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.signupSuccessful();
      })
      .catch((error) => {
        this.signupFailure(error.message, form);
      });
  }

  private signupSuccessful() {
    console.log('Signup successful');
    this.isAuthenticated = true;
    this.router.navigate(['/add-trip']);
    const dialogRef = this.dialog.open(ModalComponentDialog, {
      data: { modalTitle: 'Signup successful', modalText: "Your account was created. Add your first trip now!" },
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
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('Login successful');
        console.log(result);
        this.authSuccessful();
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

  private authSuccessful() {
    this.isAuthenticated = true;
    this.router.navigate(['/all-trips']);
  }
}
