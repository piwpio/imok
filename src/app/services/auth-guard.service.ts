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
  ) {
    this.user = userService.getUser();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('can activate', this.user);
    if (!this.user.isLogged) {
      this.router.navigate(['/start/createmaster']);
    }

    return this.user.isLogged;
  }
}
