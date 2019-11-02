import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CreateSlaveForm} from '../../../models/form-data.model';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createSlaveForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        pin: ['', Validators.required],
        repin: ['', Validators.required],
        phone: ['', Validators.required]
      }
    );
  }

  submitCreateSlave(createMasterForm: CreateSlaveForm) {
    console.log(createMasterForm);
    this.zone.run(() => {
      this.snackBar.open('Utwórz podopiecznego');
    });
  }

}
