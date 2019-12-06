import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-header-master',
  templateUrl: './header-master.component.html',
  styleUrls: ['./header-master.component.scss'],
})
export class HeaderMasterComponent implements OnInit, OnDestroy {
  private router$: any;
  public headerTitle: string;
  public sideMenuOpened = false;
  public selectedTab: string;
  public navigateBackTo: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.router$ = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( (route: NavigationEnd) => {
        // TODO
        const param = route.url.replace('/master/', '').split('/')[0];
        this.setHeader(param);
      });
  }

  setHeader(url: string) {
    console.log(url);
    switch (url) {
      case 'dashboard':
        this.setForDashboard();
        break;
      case 'new-slave':
        this.setForNewSlave();
        break;
      case 'slave-info':
        this.setForSlaveInfo();
        break;
      default:
        this.setForDashboard();
    }
  }

  goBack() {
    this.router.navigate([this.navigateBackTo]);
  }

  openSideMenu() {
    this.sideMenuOpened = true;
  }

  closeSideMenu() {
    this.sideMenuOpened = false;
  }

  setForDashboard() {
    this.headerTitle = `Dashboard`;
    this.selectedTab = `dashboard`;
    this.navigateBackTo = null;
  }

  setForNewSlave() {
    this.headerTitle = `Dodaj podopiecznego`;
    this.selectedTab = `new-slave`;
    this.navigateBackTo = null;
  }

  setForSlaveInfo() {
    this.headerTitle = `Podopieczny`;
    this.selectedTab = `slave-info`;
    this.navigateBackTo = 'master/dashboard';
  }

  userLogout() {
    this.userService.logOut();
    this.closeSideMenu();
    this.router.navigate(['start/login']);
  }

  goTo(route: string) {
    if (route !== this.selectedTab) {
      console.log(route, `master/${route}`);
      this.router.navigate([`master/${route}`]);
    }
    this.closeSideMenu();
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
