import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OwnedTowersComponent} from './TowerLoading/owned-towers/owned-towers.component';
import {CalculationComponent} from './TowerLoading/calculation/calculation.component';
import {PhyscialMeasurementComponent} from './TowerLoading/physcial-measurement/physcial-measurement.component';
import {AddAntennaComponent} from './TowerLoading/add-antenna/add-antenna.component';

const routes: Routes = [
  {path: 'owned-towers', component: OwnedTowersComponent},
  {path: 'physical-measurment', component: PhyscialMeasurementComponent},
  {path: 'calculation', component: CalculationComponent},
  {path: 'add-antenna', component: AddAntennaComponent},

  // Load Children
  {path: 'Site', loadChildren: () => import('./site-management/site-management.module').then( mod => mod.SiteManagementModule )},
  {path: 'Maintenance', loadChildren: () => import('./Maintenance/maintenance.module').then( mod => mod.MaintenanceModule )},
  {path: 'siteMap', loadChildren: () => import('./SiteMap/site-map.module').then(mod => mod.SiteMapModule)},
  {path: 'Tower', loadChildren: () => import('./TowerLoading/tower.module').then(mod => mod.TowerModule)},
  {path: 'Region', loadChildren: () => import ('./Region-Management/region-management.module').then(mod => mod.RegionManagementModule)},
  {path: 'Spec', loadChildren: () => import('./Specification/specroute/specroute.module').then(mod => mod.SpecrouteModule)},
  {path: 'Ongoing', loadChildren: () => import('./OngoingProject/project.module').then(mod => mod.ProjectModule)},
  {path: 'Security', loadChildren: () => import('./Security_Details/securitydetails.module').then(mod => mod.SecuritydetailsModule)},
  {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
