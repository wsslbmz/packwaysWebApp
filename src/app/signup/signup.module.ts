import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SignupRoutingModule,
    FormsModule,
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
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
