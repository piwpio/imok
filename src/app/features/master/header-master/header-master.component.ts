import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-master',
  templateUrl: './header-master.component.html',
  styleUrls: ['./header-master.component.scss'],
})
export class HeaderMasterComponent implements OnInit {
  public headerTitle: string;
  public sideMenuOpened = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( (route: NavigationEnd) => {
        this.setHeader(route.url.replace('/master/', ''));
      });
  }

  setHeader(url: string) {
    console.log(url);
    switch (url) {
      case 'dashboard':
        this.setForDashboard();
        break;
      default:
        this.setForDashboard();
    }
  }

  openSideMenu() {
    this.sideMenuOpened = true;
  }

  closeSideMenu() {
    this.sideMenuOpened = false;
  }

  setForDashboard() {
    this.headerTitle = `Dashboard`;
  }
}
