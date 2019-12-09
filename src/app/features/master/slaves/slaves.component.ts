import {Component, NgZone, OnInit} from '@angular/core';
import {SlaveModel} from '../../../models/slave.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-slaves',
  templateUrl: './slaves.component.html',
  styleUrls: ['./slaves.component.scss'],
})
export class SlavesComponent implements OnInit {
  public slaves: Array<SlaveModel> | null = [];

  constructor(
    private router: Router,
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.slaves = null;
  }

  ionViewWillEnter() {
    this.slaves = null;
    this.userService.getSlaves().subscribe(response => {
      if (!response.ok) { this.showSnackbar(response.message); return; }
      this.slaves = response.data;
    }, error => {
      if (error.status === 401) { this.userService.logOut(); this.router.navigate(['start/login']); }
      typeof error.error === 'string' ? this.showSnackbar(error.error) : this.showSnackbar(error.message);
    });
  }

  goToCreateNewSlaveView() {
    this.router.navigate(['master/new-slave']);
  }

  goToEdit(slaveId: string) {
    this.router.navigate(['master/slave-edit', slaveId]);
  }

  deleteSlave(slaveId: string) {
    this.userService.deleteSlave({slave_id: slaveId}).subscribe(response => {
      if (!response.ok) { this.showSnackbar(response.message); return; }
      const tmp = [...this.slaves];
      this.slaves = tmp.filter(slave => {
        return slave.id !== slaveId;
      });
      this.showSnackbar('Usunięto podopiecznego');
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
