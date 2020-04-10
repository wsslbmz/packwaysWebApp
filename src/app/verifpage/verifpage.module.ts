import { VerifpageComponent } from './verifpage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatCheckboxModule, MatToolbarModule, MatSnackBarModule, MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VerifpageRoutingModule } from './verifpage-routing.module';

@NgModule({
  declarations: [VerifpageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    VerifpageRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    //MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule
  ]
})
export class VerifpageModule { }
