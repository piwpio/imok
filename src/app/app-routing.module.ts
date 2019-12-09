import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', loadChildren: () => import('./features/start/start.module').then(m => m.StartModule)},
  { path: 'master', loadChildren: () => import('./features/master/master.module').then(m => m.MasterModule)},
  { path: 'slave', loadChildren: () => import('./features/slave/slave.module').then(m => m.SlaveModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
