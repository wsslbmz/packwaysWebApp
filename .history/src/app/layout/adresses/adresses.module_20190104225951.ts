import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';
import { PageHeaderModule } from '../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TripService } from './trips.service';
import {DataTableModule} from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TripsRoutingModule, PageHeaderModule, NgbModule, HttpModule, HttpClientModule, DataTableModule, FormsModule],
    declarations: [TripsComponent],
    providers: [TripService]
})
export class TripsModule {}

