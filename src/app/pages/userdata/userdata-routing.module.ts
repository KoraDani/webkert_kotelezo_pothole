import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserdataComponent} from "./userdata.component";

const routes: Routes = [{path: '', component: UserdataComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdataRoutingModule { }
