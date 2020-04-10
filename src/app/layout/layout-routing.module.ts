import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'trips', loadChildren: './trips/trips.module#TripsModule' },
            { path: 'adresses', loadChildren: './adresses/adresses.module#AdressesModule' },
            { path: 'address', loadChildren: './address/address.module#AddressModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'drivers', loadChildren: './drivers/drivers.module#DriversModule' },
            { path: 'pickup', loadChildren: './pickup/pickup.module#PickUpModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            {path: 'courbeille', loadChildren: './courbeille/courbeille.module#CourbeilleModule' },
            {path: 'caisse', loadChildren: './caisse/caisse.module#CaisseModule' },
            {path: 'statlivreur', loadChildren: './statlivreur/statlivreur.module#StatlivreurModule' },
            {path: 'voiture', loadChildren: './voiture/voiture.module#VoitureModule' },
            {path: 'activity', loadChildren: './activity/activity.module#ActivityModule' },
            {path: 'fuel', loadChildren: './fuel/fuel.module#FuelModule' },
            {path: 'rapport', loadChildren: './rapport/rapport.module#RapportModule' },
            {path: 'parainage', loadChildren: './parainage/parainage.module#ParainageModule' },
            { path: 'map-trips', loadChildren: './map-trips/map-trips.module#MapTripsModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
