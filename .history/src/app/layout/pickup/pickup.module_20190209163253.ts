import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickUpService } from './pickup.service';
import { HttpModule } from '@angular/http';
import { PageHeaderModule } from '../../shared';
import { PickUpRoutingModule } from './pickup-routing.module';
import { PickUpComponent } from './pickup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule, 
        PickUpRoutingModule,
        CommonModule,
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
    declarations: [PickUpComponent],
    providers: [PickUpService]
})
export class PickUpModule {}
