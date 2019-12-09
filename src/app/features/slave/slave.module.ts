import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';
import {SlaveRoutingModule} from './slave-routing.module';
import {HeaderSlaveComponent} from './header-slave/header-slave.component';
import {SlaveComponent} from './slave.component';
import {SlaveDashboardComponent} from './slave-dashboard/slave-dashboard.component';


@NgModule({
  declarations: [
    SlaveComponent,
    HeaderSlaveComponent,
    SlaveDashboardComponent
  ],
  imports: [
    SlaveRoutingModule,
    CommonModule,
    IonicModule,
    MaterialModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 10000}}
  ]
})
export class SlaveModule { }
