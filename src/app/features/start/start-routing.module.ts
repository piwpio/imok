import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from './start.component';
import {LoginComponent} from './login/login.component';
import {CreateMasterComponent} from './create-master/create-master.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';


const routes: Routes = [
  {
    path: '', component: StartComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'createmaster', component: CreateMasterComponent },
      { path: 'passwordreset', component: PasswordResetComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
