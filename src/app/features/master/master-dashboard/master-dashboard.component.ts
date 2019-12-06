import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SlaveModel} from '../../../models/slave.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.scss'],
})
export class MasterDashboardComponent implements OnInit, OnDestroy {
  public slaves: Array<SlaveModel> | null = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private zone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.slaves = null;
  }

  ionViewWillEnter() {
    this.slaves = null;
    this.userService.getSlaves().subscribe(response => {
      if (response.ok) {
        this.slaves = response.data;
      } else {
        this.zone.run(() => {
          this.snackBar.open(response.message);
        });
      }
    }, error => {
      this.zone.run(() => {
        this.snackBar.open(error.error);
      });
    });
  }

  goToCreateNewSlaveView() {
    this.router.navigate(['master/new-slave']);
  }

  ngOnDestroy(): void {
    //
  }
}
