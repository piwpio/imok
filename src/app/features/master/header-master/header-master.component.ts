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
  public selectedTab = 'dashboard';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.router$ = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( (route: NavigationEnd) => {
        // TODO
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
    this.selectedTab = `dashboard`;
  }

  userLogout() {
    this.userService.logOut();
    this.router.navigate(['start/login']);
  }

  goTo(route: string) {
    this.router.navigate([`master/${{route}}`]);
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
