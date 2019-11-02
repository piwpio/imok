import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../services/auth-guard.service';
import {MasterComponent} from './master.component';
import {MasterDashboardComponent} from './master-dashboard/master-dashboard.component';
import {NewSlaveComponent} from './new-slave/new-slave.component';


const routes: Routes = [
  {
    path: '', component: MasterComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MasterDashboardComponent},
      { path: 'new-slave', component: NewSlaveComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
