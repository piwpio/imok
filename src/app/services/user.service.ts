import { Injectable } from '@angular/core';
import {DEFAULT_USER, UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel;

  constructor() {}

  initUser() {
    console.log('initUser');
    return new Promise((resolve, reject) => {
      const userString = localStorage.getItem('user');
      if (userString) {
        this.user = JSON.parse(userString) as UserModel;
      } else {
        this.user = DEFAULT_USER;
      }
      resolve(true);
    });
  }

  getUser() {
    return this.user;
  }

  setUser(user: UserModel | null) {
    this.user = user;
  }

  isLogged() {
    return this.user !== null && this.user.isLogged;
  }
}
