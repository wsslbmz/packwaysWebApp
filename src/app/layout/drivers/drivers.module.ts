import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversComponent } from './drivers.component';
import { DriversRoutingModule } from './drivers.routing.module';
import { DriversService } from './drivers.service';
import { HttpModule } from '@angular/http';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [DriversComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    DataTableModule,
    DriversRoutingModule,
    HttpModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
  ],
  providers: [DriversService]
})
export class DriversModule { }
