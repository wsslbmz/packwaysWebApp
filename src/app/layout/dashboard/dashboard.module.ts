import { StatDriverModule } from './../../shared/modules/statdriver/statdriver.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        HttpModule,
        StatDriverModule,
        DataTableModule,
        MatFormFieldModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ],
    providers:[DashboardService]
})
export class DashboardModule {}
