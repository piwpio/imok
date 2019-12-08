import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LoginForm} from '../../../models/form-data.model';
import {UserService} from '../../../services/user.service';
import {UserModel} from '../../../models/user.model';

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
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ionViewWillEnter() {
    if (this.loginForm) {
      this.loginForm.get('email').setValue('');
      this.loginForm.get('password').setValue('');
    }
  }

  submitLogin(loginFormValues: LoginForm) {
    this.userService.logIn(loginFormValues)
      .subscribe(response => {
        if (response.ok) {
          const data = response.data;
          const user: UserModel = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            token: data.token,
            isLogged: true,
          };
          this.userService.setUser(user);
          this.router.navigate(['master/dashboard']);
        } else {
          this.zone.run(() => {
            this.snackBar.open(response.message);
          });
        }
      }, error => {
        this.zone.run(() => {
          this.snackBar.open(error.error);
          console.log(error);
        });
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
