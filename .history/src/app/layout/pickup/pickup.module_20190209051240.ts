import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickUpRoutingModule } from './pickup-routing.module';
import { PickUpComponent } from './pickup.component';

@NgModule({
    imports: [CommonModule, PickUpRoutingModule],
    declarations: [PickUpComponent]
})
export class PickUpModule {}
