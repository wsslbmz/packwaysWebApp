import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { CaisseComponent } from './caisse/caisse.component';
import { RapportComponent } from './rapport/rapport.component';
import { ParainageComponent } from './parainage/parainage.component';
import { FuelComponent } from './fuel/fuel.component';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, SmartTableComponent]
})
export class LayoutModule {}
