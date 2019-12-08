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

  goToEdit(slaveId: string) {
    this.router.navigate(['master/slave-edit', slaveId]);
  }

}
