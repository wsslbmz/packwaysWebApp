import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickUpComponent } from './pickup.component';

const routes: Routes = [
    {
        path: '',
        component: PickUpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PickUpRoutingModule {}
