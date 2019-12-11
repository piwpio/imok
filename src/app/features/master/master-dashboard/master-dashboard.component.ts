import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SlaveModel} from '../../../models/slave.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MatSnackBar} from '@angular/material';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrls: ['./master-dashboard.component.scss'],
})
export class MasterDashboardComponent implements OnInit, OnDestroy {
  public slaves: Array<SlaveModel> | null = [];
  public sub: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.slaves = null;
  }

  ionViewWillEnter() {
    this.slaves = null;
    this.userService.getSlaves().subscribe(response => {
      if (!response.ok) { this.showSnackbar(response.message); return; }
      this.slaves = response.data;
      this.sub = interval(10000).subscribe(n => {
        this.userService.getSlaves().subscribe(response2 => {
          if (!response2.ok) { this.showSnackbar(response2.message); return; }
          this.slaves.forEach((s, i) => {
            if (this.slaves[i].isOk !== response2.data[i].isOk) {
              this.slaves[i].isOk = response2.data[i].isOk;
            }
            console.log(this.slaves[i].actions.length, response2.data[i].actions.length);
            if (this.slaves[i].actions.length !== response2.data[i].actions.length) {
              this.slaves[i] = response2.data[i];
              this.cdr.detectChanges();
            }
          });
        }, error => {
          if (error.status === 401) {
            this.userService.logOut();
            this.router.navigate(['start/login']);
          }
          typeof error.error === 'string' ? this.showSnackbar(error.error) : this.showSnackbar(error.message);
        });
      });
    }, error => {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      if (error.status === 401) { this.userService.logOut(); this.router.navigate(['start/login']); }
      typeof error.error === 'string' ? this.showSnackbar(error.error) : this.showSnackbar(error.message);
    });
  }

  ionViewDidLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.slaves = null;
  }

  goToCreateNewSlaveView() {
    this.router.navigate(['master/new-slave']);
  }

  showSnackbar(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.slaves = null;
  }
}
