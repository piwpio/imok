import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../../services/auth-guard.service';
import {SlaveDashboardComponent} from './slave-dashboard/slave-dashboard.component';
import {SlaveComponent} from './slave.component';

const routes: Routes = [
  {
    path: '', component: SlaveComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SlaveDashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlaveRoutingModule { }
