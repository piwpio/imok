import { Injectable } from '@angular/core';
import {DEFAULT_USER, UserModel} from '../models/user.model';
import {API_BASE_URL} from '../constants/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel;

  constructor(
    private http: HttpClient
  ) {}

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

  logOut() {
    localStorage.removeItem('user');
    this.user = DEFAULT_USER;
  }

  logIn(body): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/login`, body);
  }

  createMaster(body): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/createmaster`, body);
  }

  getSlaves() {
    return this.http.post<any>(`${API_BASE_URL}/masterslaves`, {token: this.user.token});
  }

  createSlave(body): Observable<any> {
    body.token = this.user.token;
    return this.http.post<any>(`${API_BASE_URL}/createslave`, body);
  }

  editSlave(body): Observable<any> {
    body.token = this.user.token;
    return this.http.post<any>(`${API_BASE_URL}/editslave`, body);
  }

  logoutSlave(): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/logoutslave`, {token: this.user.token});
  }

  getSlave(body): Observable<any> {
    body.token = this.user.token;
    return this.http.post<any>(`${API_BASE_URL}/getslave`, body);
  }

  manageSlave(body): Observable<any> {
    body.token = this.user.token;
    return this.http.post<any>(`${API_BASE_URL}/manageslave`, body);
  }
}
