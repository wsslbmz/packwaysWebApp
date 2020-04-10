import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapTripsComponent } from './map-trips.component';

const routes: Routes = [
    {
        path: '', component: MapTripsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapTripsRoutingModule {
}
