import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { AddressRoutingModule } from './address.routing.module';
import { AgmCoreModule } from '@agm/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {DataTableModule} from 'angular-6-datatable';
import { AddressService } from './address.service';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleAPIKey,
      libraries: ['places']
    }),
    CommonModule,
    AddressRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgbModule,
    PageHeaderModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    Ng2CompleterModule
  ],
  declarations: [ AddressComponent ],
  providers: [AddressService],
  bootstrap: [ AddressComponent ]
})
export class AddressModule { }
