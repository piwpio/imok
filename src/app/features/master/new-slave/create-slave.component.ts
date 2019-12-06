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

  submitCreateSlave(createSlaveForm: CreateSlaveForm) {
    this.userService.createSlave(createSlaveForm).subscribe(response => {
      if (response.ok) {
        this.zone.run(() => {
          this.snackBar.open('Utwórzono podopiecznego');
        });
        this.router.navigate(['master/dashboard']);
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

}
