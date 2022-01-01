import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.interface';
import { User } from './user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  isAuthenticated = false;
  private user: User;

  constructor(
    private router: Router,
    private AngularFireAuth: AngularFireAuth
  ) {}

  registerUser(authData: AuthData, form: NgForm) {
    this.AngularFireAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then((result) => {
        console.log(result);
        this.signupSuccessful();
      })
      .catch((error) => {
        this.signupFailure(error.message, form);
      });
  }

  login(authData: AuthData) {
    this.AngularFireAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then((result) => {
        // console.log(result);
        this.authSuccessful();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOut() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
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
    this.authChange.next(true);
    this.router.navigate(['/all-trips']);
  }
}
