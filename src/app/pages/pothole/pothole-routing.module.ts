import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PotholeComponent} from "./pothole.component";

const routes: Routes = [
  {path: '', component: PotholeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotholeRoutingModule { }
