import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SlaveModel} from '../../../models/slave.model';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {EditSlaveForm} from '../../../models/form-data.model';

@Component({
  selector: 'app-slave-edit',
  templateUrl: './slave-edit.component.html',
  styleUrls: ['./slave-edit.component.scss'],
})
export class SlaveEditComponent implements OnInit {
  routeSubscription$: Subscription;
  slave: SlaveModel;
  slaveId: string;
  slaveEditForm: FormGroup | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.slave = null;
  }

  ionViewWillEnter() {
    this.slave = null;
    this.routeSubscription$ = this.route.params.subscribe(params => {
      this.slaveId = params.id;
      const body = {slave_id: this.slaveId};
      this.userService.getSlave(body).subscribe(response => {
        if (response.ok) {
          this.slave = response.data;
          this.slaveEditForm = this.formBuilder.group(
            {
              slave_id: [this.slave.id, Validators.required],
              name: [this.slave.name, Validators.required],
              phone: [this.slave.phone, Validators.required],
              password: [''],
              repassword: [''],
            }
          );
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
    });
  }

  ionViewDidLeave() {
    this.routeSubscription$.unsubscribe();
    this.slaveEditForm = null;
  }

  submitEditSlave(slaveEditForm: EditSlaveForm) {
    this.userService.editSlave(slaveEditForm).subscribe(response => {
      if (response.ok) {
        this.zone.run(() => {
          this.snackBar.open('Zaktualizowano podopiecznego');
        });
        this.router.navigate(['master/slaves']);
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

  submitLogoutSlave(event: MouseEvent) {
    event.preventDefault();
    console.log('logut slave');
  }

}
