import { Injectable } from '@angular/core';
import {DEFAULT_USER, UserModel} from '../models/user.model';
import {Observable} from 'rxjs';

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
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  logIn(email: string, password: string): Observable<UserModel> {
    return new Observable<UserModel>((observer) => {
      if (email === 'pp@p.com' && password === 'asd') {
        const loggedTestUser: UserModel = {
          id: 1,
          name: 'Piotr Piwowar',
          token: 'token',
          isLogged: true
        };
        observer.next(loggedTestUser);
      } else {
        observer.next(DEFAULT_USER);
      }
      observer.complete();
    });
  }

  logOut() {
    localStorage.removeItem('user');
    this.user = DEFAULT_USER;
  }
}
