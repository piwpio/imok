import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MasterDashboardComponent} from './master-dashboard/master-dashboard.component';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import {HeaderMasterComponent} from './header-master/header-master.component';
import {CreateSlaveComponent} from './new-slave/create-slave.component';
import {SlaveDashboardListElementComponent} from './slave-dashboard-list-element/slave-dashboard-list-element.component';
import {SlaveEditComponent} from './slave-edit/slave-edit.component';
import {SlaveComponent} from './slave/slave.component';
import {AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {SlaveMapComponent} from './slave-map/slave-map.component';
import {SlavesComponent} from './slaves/slaves.component';


@NgModule({
  declarations: [
    MasterComponent,
    HeaderMasterComponent,
    MasterDashboardComponent,
    SlaveDashboardListElementComponent,
    CreateSlaveComponent,
    SlaveEditComponent,
    SlaveComponent,
    SlaveMapComponent,
    SlavesComponent
  ],
  imports: [
    MasterRoutingModule,
    CommonModule,
    IonicModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBE2RLbpSTs7_LhsFqCgTc2jjV14Xlv6Ys'
    })
  ],
  providers: [
    GoogleMapsAPIWrapper,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class MasterModule { }
