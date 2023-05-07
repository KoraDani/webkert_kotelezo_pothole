import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotholeRoutingModule } from './pothole-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PotholeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class PotholeModule { }
