import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from '../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserService } from './users.service';
import {DataTableModule} from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {NgAutoCompleteModule} from 'ng-auto-complete';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        NgbModule,
        HttpModule,
        HttpClientModule,
        DataTableModule,
        FormsModule,
        GooglePlaceModule,
        NgAutoCompleteModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        NgxSpinnerModule],
    declarations: [UsersComponent],
    providers: [UserService]
})
export class UsersModule {}

