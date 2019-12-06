import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CreateMasterForm} from '../../../models/form-data.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-create-master',
  templateUrl: './create-master.component.html',
  styleUrls: ['./create-master.component.scss'],
})
export class CreateMasterComponent implements OnInit {
  public createMasterForm: FormGroup;

  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createMasterForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        repassword: ['', Validators.required]
      }
    );
  }

  submitCreateMaster(createMasterForm: CreateMasterForm) {
    this.userService.createMaster(createMasterForm).subscribe(response => {
      if (response.ok) {
        //
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
