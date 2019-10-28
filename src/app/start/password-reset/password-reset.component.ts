import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

interface PasswordResetForm {
  email: string;
}

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

  submitLogin(passwordResetForm: PasswordResetForm) {
    console.log(passwordResetForm);
    this.zone.run(() => {
      this.snackBar.open('Jeżeli email istnieje w bazie, wysłaliśmy tam link resetujący hasło. Sprawdź skrzynkę pocztową.');
    });
  }
}
