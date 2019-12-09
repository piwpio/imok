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
  public masterLogin = true;

  constructor(
    private router: Router,
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.masterLogin = true;
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ionViewWillEnter() {
    this.masterLogin = true;
    if (this.loginForm) {
      this.loginForm.get('email').setValue('');
      this.loginForm.get('password').setValue('');
    }
  }

  submitLogin(loginFormValues: LoginForm) {
    loginFormValues.master_login = this.masterLogin;
    this.userService.logIn(loginFormValues)
      .subscribe(response => {
        if (!response.ok) { this.showSnackbar(response.message); return; }
        const data = response.data;
        const user: UserModel = {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          token: data.token,
          isMaster: data.isMaster,
          isLogged: true
        };
        this.userService.setUser(user);
        if (this.masterLogin) {
          this.router.navigate(['master/dashboard']);
        } else {
          this.router.navigate(['slave/dashboard']);
        }
      }, error => {
        if (error.status === 401) { this.userService.logOut(); this.router.navigate(['start/login']); }
        typeof error.error === 'string' ? this.showSnackbar(error.error) : this.showSnackbar(error.message);
      });
  }

  goToCreateMaster(event: Event) {
    event.preventDefault();
    this.router.navigate(['start/createmaster']);
  }

  // goToPasswordReset(event: Event) {
  //   event.preventDefault();
  //   this.router.navigate(['start/passwordreset']);
  // }

  showSnackbar(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

}
