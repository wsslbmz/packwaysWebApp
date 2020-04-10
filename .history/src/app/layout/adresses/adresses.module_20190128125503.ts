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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {NgAutoCompleteModule} from 'ng-auto-complete';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: environment.googleAPIKey,
            libraries: ['places']
        }),
        CommonModule,
        AdressesRoutingModule,
        PageHeaderModule,
        NgbModule,
        HttpModule,
        HttpClientModule,
        DataTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        GooglePlaceModule,
        NgAutoCompleteModule],
    declarations: [AdressesComponent],
    providers: [AdresseService]
})
export class AdressesModule {}

