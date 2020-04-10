import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        Ng2SmartTableModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, SmartTableComponent]
})
export class LayoutModule {}
