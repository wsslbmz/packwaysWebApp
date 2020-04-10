import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserService } from './users.service';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [CommonModule, UsersRoutingModule, PageHeaderModule, NgbModule, HttpModule,
         HttpClientModule, DataTableModule, FormsModule, BrowserAnimationsModule],
    declarations: [UsersComponent],
    providers: [UserService]
})
export class UsersModule {}
