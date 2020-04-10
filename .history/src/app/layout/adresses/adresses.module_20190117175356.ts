import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdressesRoutingModule } from './adresses-routing.module';
import { AdressesComponent } from './adresses.component';
import { PageHeaderModule } from '../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AdresseService } from './adresses.service';
import {DataTableModule} from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {NgAutoCompleteModule} from 'ng-auto-complete';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        CommonModule,
        AdressesRoutingModule,
        PageHeaderModule,
        NgbModule,
        HttpModule,
        HttpClientModule,
        DataTableModule,
        FormsModule,
        GooglePlaceModule,
        NgAutoCompleteModule,
        Ng2SmartTableModule],
    declarations: [AdressesComponent],
    providers: [AdresseService]
})
export class AdressesModule {}

