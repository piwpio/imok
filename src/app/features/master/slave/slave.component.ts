import {Component, NgZone, OnInit} from '@angular/core';
import {SlaveModel} from '../../../models/slave.model';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SlaveManageForm} from '../../../models/form-data.model';

@Component({
  selector: 'app-slave',
  templateUrl: './slave.component.html',
  styleUrls: ['./slave.component.scss'],
})
export class SlaveComponent implements OnInit {
  routeSubscription$: Subscription;
  slave: SlaveModel;
  slaveId: string;
  slaveManageForm: FormGroup | null = null;
  intervals = [
    {text: '1 minuta', seconds: 60},
    {text: '15 minut', seconds: 15 * 60},
    {text: '30 minut', seconds: 30 * 60},
    {text: '1 godzina', seconds:  60 * 60},
    {text: '2 godziny', seconds: 2 * 60 * 60},
    {text: '1 dzień', seconds: 60 * 60 * 24}
  ];

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
          this.slave.lastLocations = [{
            lat: 50.0582514,
            long: 19.947557,
            time: 1575664894885
          }];
          this.slaveManageForm = this.formBuilder.group(
            {
              slave_id: [this.slaveId, Validators.required],
              is_active: [this.slave.isActive, Validators.required],
              interval: [this.slave.interval, Validators.required]
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
    this.slaveManageForm = null;
  }

  submitManageSlave(slaveManageForm: SlaveManageForm) {
    this.userService.manageSlave(slaveManageForm).subscribe(response => {
      if (response.ok) {
        this.zone.run(() => {
          this.snackBar.open('Zaktualizowano podopiecznego');
        });
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

  goToMap(lat: number, long: number) {
    this.router.navigate(['master/slave-map', lat, long]);
  }

}
