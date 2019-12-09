import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CreateSlaveForm} from '../../../models/form-data.model';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-slave',
  templateUrl: './create-slave.component.html',
  styleUrls: ['./create-slave.component.scss'],
})
export class CreateSlaveComponent implements OnInit {
  public createSlaveForm: FormGroup;

  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createSlaveForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required],
        repassword: ['', Validators.required],
        phone: ['', Validators.required]
      }
    );
  }

  ionViewWillEnter() {
    if (this.createSlaveForm) {
      this.createSlaveForm.get('name').setValue('');
      this.createSlaveForm.get('password').setValue('');
      this.createSlaveForm.get('repassword').setValue('');
      this.createSlaveForm.get('phone').setValue('');
    }
  }

  submitCreateSlave(createSlaveForm: CreateSlaveForm) {
    this.userService.createSlave(createSlaveForm).subscribe(response => {
      if (!response.ok) { this.showSnackbar(response.message); return; }
      this.showSnackbar('Utwórzono podopiecznego');
      this.router.navigate(['master/dashboard']);
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
