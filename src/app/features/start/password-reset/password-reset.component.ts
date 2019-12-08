import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {PasswordResetForm} from '../../../models/form-data.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  public passwordResetForm: FormGroup;

  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.passwordResetForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
      }
    );
  }

  ionViewWillEnter() {
    if (this.passwordResetForm) {
      this.passwordResetForm.get('email').setValue('');
    }
  }

  submitLogin(passwordResetForm: PasswordResetForm) {
    this.showSnackbar('Jeżeli email istnieje w bazie, wysłaliśmy tam link resetujący hasło. Sprawdź skrzynkę pocztową.')
  }

  showSnackbar(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }
}
