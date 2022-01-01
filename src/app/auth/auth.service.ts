import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.interface';
import { User } from './user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    private router: Router,
    private AngularFireAuth: AngularFireAuth
  ) {}

  registerUser(authData: AuthData) {
    console.log('mierda');
    console.log(authData);
    this.AngularFireAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then((result) => {
        console.log(result);
        this.signupSuccessful();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.AngularFireAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then((result) => {
        console.log(result);
        this.authSuccessful();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOut() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return true;
    // return this.user != null;
  }

  private signupSuccessful() {
    this.router.navigate(['/add-trip']);
    setTimeout(() => {
      alert('Your account was successfully created!');
    }, 500);
  }

  private authSuccessful() {
    this.authChange.next(true);
    this.router.navigate(['/all-trips']);
  }
}
