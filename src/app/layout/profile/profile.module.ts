import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTableModule } from 'angular-6-datatable';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatPaginatorModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import { ProfileService } from './profile.service';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    DataTableModule,        
    HttpModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
  ],
  providers:[ProfileService]
  
})
export class ProfileModule { }
