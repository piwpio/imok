import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';
import {MatSnackBarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MasterDashboardComponent} from './master-dashboard/master-dashboard.component';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import {HeaderMasterComponent} from './header-master/header-master.component';


@NgModule({
  declarations: [
    MasterComponent,
    HeaderMasterComponent,
    MasterDashboardComponent
  ],
  imports: [
    MasterRoutingModule,
    CommonModule,
    IonicModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class MasterModule { }
