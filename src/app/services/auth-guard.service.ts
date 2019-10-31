import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user: UserModel;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.user = this.userService.getUser();
    console.log('can activate', this.user);
    if (!this.user.isLogged) {
      this.router.navigate(['start/login']);
    }

    return this.user.isLogged;
  }
}
