import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../services/auth-guard.service';
import {MasterComponent} from './master.component';
import {MasterDashboardComponent} from './master-dashboard/master-dashboard.component';
import {CreateSlaveComponent} from './new-slave/create-slave.component';
import {SlaveEditComponent} from './slave-edit/slave-edit.component';
import {SlaveComponent} from './slave/slave.component';
import {SlaveMapComponent} from './slave-map/slave-map.component';


const routes: Routes = [
  {
    path: '', component: MasterComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MasterDashboardComponent},
      { path: 'new-slave', component: CreateSlaveComponent},
      { path: 'slave-edit', component: SlaveEditComponent},
      { path: 'slave-info/:id', component: SlaveComponent},
      { path: 'slave-map/:lat/:long', component: SlaveMapComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
