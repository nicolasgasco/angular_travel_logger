import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth/auth-data.interface';
import { TripsService } from './trips.service';

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
    private tripsService: TripsService
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

  registerUser(authData: AuthData, form: NgForm) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        // this.signupSuccessful();
      })
      .catch((error) => {
        this.signupFailure(error.message, form);
      });
  }

  login(authData: AuthData) {
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // console.log(result);
        // this.authSuccessful();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOut() {
    this.isAuthenticated = false;
    console.log('Goodbye');
    this.tripsService.cancelSubscriptions();
    this.angularFireAuth.signOut();
    // this.router.navigate(['/login']);
  }

  private signupSuccessful() {
    this.isAuthenticated = true;
    this.router.navigate(['/add-trip']);
    setTimeout(() => {
      alert('Your account was successfully created!');
    }, 500);
  }

  private signupFailure(message: string, form: NgForm) {
    this.isAuthenticated = false;
    form.resetForm();
    alert(message);
  }

  private authSuccessful() {
    this.isAuthenticated = true;
    this.router.navigate(['/all-trips']);
  }
}
