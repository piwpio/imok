import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {CreateMasterForm} from '../../../models/form-data.model';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

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
    private userService: UserService,
    private router: Router
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
      if (!response.ok) { this.showSnackbar(response.message); return; }
      this.showSnackbar('Utworzono nowe konto. Teraz możesz się zalogować.');
      this.router.navigate(['start/login']);
    }, error => {
      this.showSnackbar(error.message);
    });
  }

  showSnackbar(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }
}
