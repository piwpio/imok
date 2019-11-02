import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CreateMasterForm} from '../../../models/form-data.model';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createMasterForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        repassword: ['', Validators.required]
      }
    );
  }

  submitCreateMaster(createMasterForm: CreateMasterForm) {
    console.log(createMasterForm);
    this.zone.run(() => {
      this.snackBar.open('Utwórz konto');
    });
  }
}
