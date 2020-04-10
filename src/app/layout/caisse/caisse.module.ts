import { CaisseComponent } from './caisse.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseRoutingModule } from './caisse-routing.module';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatCardModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  declarations: [CaisseComponent],
  imports: [
    CommonModule, CaisseRoutingModule, PageHeaderModule, NgbModule, HttpModule,
         HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
          MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
           NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule
  ]
})
export class CaisseModule { }
