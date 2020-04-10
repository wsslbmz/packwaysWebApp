import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdressesComponent } from './adresses.component';

const routes: Routes = [
    {
        path: '', component: AdressesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdressesRoutingModule {
}
