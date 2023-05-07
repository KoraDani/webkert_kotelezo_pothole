import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from "./shared/services/auth-guard.guard";

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  { path: 'list', loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule)},
  { path: 'pothole', loadChildren: () => import('./pages/pothole/pothole.module').then(m => m.PotholeModule), canActivate: [AuthGuardGuard]},
  { path: 'userdata', loadChildren: () => import('./pages/userdata/userdata.module').then(m => m.UserdataModule), canActivate: [AuthGuardGuard]},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
  { path: '', redirectTo:'/login', pathMatch:'full'},
  { path: '**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
