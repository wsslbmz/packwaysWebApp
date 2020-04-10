import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core'            // @agm/core
import { AgmDirectionModule } from 'agm-direction'   // agm-direction
import { MapTripsComponent } from './map-trips.component';
import { MapTripsRoutingModule } from './map-trips-routing.module';
import {environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    MapTripsRoutingModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: environment.googleAPIKey,
    }),
    AgmDirectionModule
  ],
  declarations: [MapTripsComponent]
})
export class MapTripsModule { }
