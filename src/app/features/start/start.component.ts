import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('start component');
    this.cdr.detectChanges();
    this.checkIfLogged();
  }

  checkIfLogged() {
    const user = this.userService.getUser();
    if (user.token) {
      this.userService.checkStillLogged().subscribe( response => {
        if (response.ok) {
          const data = response.data;
          const setUser: UserModel = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            token: data.token,
            isMaster: data.isMaster,
            isLogged: true
          };
          this.userService.setUser(setUser);
          if (data.isMaster) {
            this.router.navigate(['master/dashboard']);
          } else {
            this.router.navigate(['slave/dashboard']);
          }
        } else {
          this.router.navigate(['start/login']);
        }
      }, error => {
        if (error.status === 401) { this.userService.logOut(); this.router.navigate(['start/login']); }
        this.router.navigate(['start/login']);
      });
    } else {
      this.userService.logOut();
      this.router.navigate(['start/login']);
    }
  }

}
