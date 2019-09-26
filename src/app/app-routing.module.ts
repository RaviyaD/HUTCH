import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {SpecNavComponent} from './Specification/spec-nav/spec-nav.component';
import {AddVisitorsComponent} from './Security_Details/add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './Security_Details/view-visitors/view-visitors.component';
import {ViewIncidentsComponent} from './Security_Details/view-incidents/view-incidents.component';
import {AddIncidentsComponent} from './Security_Details/add-incidents/add-incidents.component';
import {OwnedTowersComponent} from './TowerLoading/owned-towers/owned-towers.component';
import {CalculationComponent} from './TowerLoading/calculation/calculation.component';
import {ViewOngoingProjectComponent} from './OngoingProject/view-ongoing-project/view-ongoing-project.component';
import {AddNewProjectComponent} from './OngoingProject/add-new-project/add-new-project.component';
import {PhyscialMeasurementComponent} from './TowerLoading/physcial-measurement/physcial-measurement.component';
import {AddAntennaComponent} from './TowerLoading/add-antenna/add-antenna.component';
import {ViewSiteSecurityPersonComponent} from './Security_Details/view-site-security-person/view-site-security-person.component';
import {AddSiteSecurityPersonComponent} from './Security_Details/add-site-security-person/add-site-security-person.component';
import {SpecLogTableComponent} from './Specification/spec-log-table/spec-log-table.component';
const routes: Routes = [
  {path: 'spec-nav', component: SpecNavComponent},
  {path: 'add-visitors', component: AddVisitorsComponent},
  {path: 'view-visitors', component: ViewVisitorsComponent},
  {path: 'view-incidents', component: ViewIncidentsComponent},
  {path: 'add-incidents', component: AddIncidentsComponent},
  {path: 'owned-towers', component: OwnedTowersComponent},
  {path: 'physical-measurment', component: PhyscialMeasurementComponent},
  {path: 'calculation', component: CalculationComponent},
  {path: 'add-new-project', component: AddNewProjectComponent },
  {path: 'view-ongoing-project', component: ViewOngoingProjectComponent},
  {path: 'add-antenna', component: AddAntennaComponent},
  {path: 'addSpec', component: SpecLogTableComponent},
  {path: 'add-antenna', component: AddAntennaComponent},
  {path: 'view-site-security-person', component: ViewSiteSecurityPersonComponent},
  {path: 'add-site-security-person', component: AddSiteSecurityPersonComponent},
  {path: 'view-incidents', component: ViewIncidentsComponent},
  {path: 'add-incidents', component: AddIncidentsComponent},

  // Load Children
  {path: 'Site', loadChildren: () => import('./site-management/site-management.module').then( mod => mod.SiteManagementModule )},
  {path: 'Maintenance', loadChildren: () => import('./Maintenance/maintenance.module').then( mod => mod.MaintenanceModule )},
  {path: 'siteMap', loadChildren: () => import('./SiteMap/site-map.module').then(mod => mod.SiteMapModule)},
  { path: 'Tower', loadChildren: () => import('./TowerLoading/tower.module').then(mod => mod.TowerModule)},
  {path: 'Region', loadChildren: () => import ('./Region-Management/region-management.module').then(mod => mod.RegionManagementModule)},
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
