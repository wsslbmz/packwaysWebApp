import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './address.routing.module';


@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    AddressRoutingModule
  ]
})
export class DriversModule { }
