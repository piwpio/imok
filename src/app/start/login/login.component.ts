import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  submitLogin(loginFormValues: LoginForm) {
    this.zone.run(() => {
      this.snackBar.open('Login');
    });
  }

  goToCreateMaster(event: Event) {
    event.preventDefault();
    this.router.navigate(['start/createmaster']);
  }

  goToPasswordReset(event: Event) {
    event.preventDefault();
    this.router.navigate(['start/passwordreset']);
  }

}
