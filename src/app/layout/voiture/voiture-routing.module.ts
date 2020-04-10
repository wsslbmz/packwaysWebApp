import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoitureComponent } from './voiture.component';

const routes: Routes = [
    {
        path: '', component: VoitureComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VoitureRoutingModule {
}
