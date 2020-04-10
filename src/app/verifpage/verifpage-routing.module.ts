import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifpageComponent } from './verifpage.component';

const routes: Routes = [
    {
        path: '', component: VerifpageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerifpageRoutingModule {
}