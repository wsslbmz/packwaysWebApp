import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversComponent } from './drivers.component';
import { DriversRoutingModule } from './drivers.routing.module';


@NgModule({
  declarations: [DriversComponent],
  imports: [
    CommonModule,
    DriversRoutingModule
  ]
})
export class DriversModule { }
