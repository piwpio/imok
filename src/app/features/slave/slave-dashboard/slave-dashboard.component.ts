import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slave-dashboard',
  templateUrl: './slave-dashboard.component.html',
  styleUrls: ['./slave-dashboard.component.scss'],
})
export class SlaveDashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {}

  sendIsOk(isOk: boolean) {
    this.userService.isOk({is_ok: isOk}).subscribe(response => {
      if (!response.ok) { this.showSnackbar(response.message); return; }
      this.showSnackbar('Wyslano powiadomienie');
    }, error => {
      if (error.status === 401) { this.userService.logOut(); this.router.navigate(['start/login']); }
      typeof error.error === 'string' ? this.showSnackbar(error.error) : this.showSnackbar(error.message);
    });
  }

  showSnackbar(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

}
