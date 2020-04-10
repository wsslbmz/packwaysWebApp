import { CourbeilleService } from './courbeille.serveice';
import { CourbeilleRoutingModule } from './courbeille-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2CompleterModule } from 'ng2-completer';
import { CourbeilleComponent } from './courbeille.component';

@NgModule({
  declarations: [CourbeilleComponent],
  imports: [
    CommonModule, CourbeilleRoutingModule, PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
     MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
      NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule
  ],
  providers:[CourbeilleService]
})
export class CourbeilleModule { }
