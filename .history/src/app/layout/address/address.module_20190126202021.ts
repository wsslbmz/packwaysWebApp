import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './address.routing.module';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleAPIKey,
      libraries: ['places']
    }),
    CommonModule,
    AddressRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ AddressComponent ],
  bootstrap: [ AddressComponent ]
})
export class AddressModule { }
