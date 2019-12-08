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
  public param: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.router$ = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( (route: NavigationEnd) => {
        const split = route.url.replace('/master/', '').split('/');
        const url = split[0];
        const param = split[1] !== undefined ? split[1] : null;
        this.setHeader(url, param);
      });
  }

  setHeader(url: string, param: string) {
    console.log(url);
    switch (url) {
      case 'dashboard':
        this.setForDashboard();
        break;
      case 'new-slave':
        this.setForNewSlave();
        break;
      case 'slave-info':
        this.setForSlaveInfo(param);
        break;
      case 'slave-map':
        this.setForSlaveMap();
        break;
      case 'slaves':
        this.setForSlaves();
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
    this.selectedTab = `dashboard`;
    this.navigateBackTo = null;
    this.param = null;
  }

  setForSlaves() {
    this.headerTitle = `Podopieczni`;
    this.selectedTab = `slaves`;
    this.navigateBackTo = null;
    this.param = null;
  }

  setForNewSlave() {
    this.headerTitle = `Dodaj podopiecznego`;
    this.selectedTab = `new-slave`;
    this.navigateBackTo = null;
    this.param = null;
  }

  setForSlaveInfo(param) {
    this.headerTitle = `Podopieczny`;
    this.selectedTab = `slave-info`;
    this.navigateBackTo = 'master/dashboard';
    this.param = param;
  }

  setForSlaveMap() {
    this.headerTitle = `Lokalizacja`;
    this.selectedTab = `slave-map`;
    if (!this.param) {
      this.navigateBackTo = 'master/dashboard';
    } else {
      this.navigateBackTo = 'master/slave-info';
    }
  }

  userLogout() {
    this.userService.logOut();
    this.closeSideMenu();
    this.router.navigate(['start/login']);
  }

  goTo(route: string) {
    if (route !== this.selectedTab) {
      this.router.navigate([`master/${route}`]);
    }
    this.closeSideMenu();
  }

  goBack() {
    if (this.param && this.selectedTab === 'slave-map') {
      this.router.navigate([this.navigateBackTo, this.param]);
    } else {
      this.router.navigate([this.navigateBackTo]);
    }
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
