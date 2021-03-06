import { StatlivreurRoutingModule } from './statlivreur-routing.module';
import { StatlivreurComponent } from './statlivreur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule, StatDriverModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  declarations: [StatlivreurComponent],
  imports: [
    CommonModule, StatlivreurRoutingModule , PageHeaderModule, NgbModule, HttpModule,
         HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
          MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
           NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, StatDriverModule
  ]
})
export class StatlivreurModule { }
