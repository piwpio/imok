import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-start',
  templateUrl: './header-start.component.html',
  styleUrls: ['./header-start.component.scss'],
})
export class HeaderStartComponent implements OnInit {
  public headerTitle: string;
  public navigateBackTo: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( (route: NavigationEnd) => {
          this.setHeader(route.url.replace('/start/', ''));
       });
  }

  setHeader(url: string) {
    console.log(url);
    switch (url) {
      case 'login':
        this.setForLogin();
        break;
      case 'createmaster':
        this.setForCreateMaster();
        break;
      case 'passwordreset':
        this.setForPasswordReset();
        break;
      default:
        this.setForLogin();
    }
  }

  goBack() {
    this.router.navigate([this.navigateBackTo]);
  }

  setForLogin() {
    this.headerTitle = `Witaj w I'm OK`;
    this.navigateBackTo = null;
  }

  setForCreateMaster() {
    this.headerTitle = `Utwórz konto`;
    this.navigateBackTo = 'start/login';
  }

  setForPasswordReset() {
    this.headerTitle = `Zresetuj hasło`;
    this.navigateBackTo = 'start/login';
  }

}
