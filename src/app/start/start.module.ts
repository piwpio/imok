import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start.component';
import { IonicModule } from '@ionic/angular';
import { CreateMasterComponent } from './create-master/create-master.component';
import {MaterialModule} from '../material.module';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderStartComponent} from './header-start/header-start.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    HeaderStartComponent,
    StartComponent,
    LoginComponent,
    CreateMasterComponent,
    PasswordResetComponent
  ],
  imports: [
    StartRoutingModule,
    CommonModule,
    IonicModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
  // entryComponents: [HeaderStartComponent]
})
export class StartModule { }
