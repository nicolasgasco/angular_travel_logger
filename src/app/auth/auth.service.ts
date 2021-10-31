import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.interface';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
  }

  logOut() {
    this.user = null;
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
  constructor() {}
}
