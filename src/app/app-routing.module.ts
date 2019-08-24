import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecNavComponent} from './Specification/spec-nav/spec-nav.component';
import { AddMaintenanceComponent} from './Maintenance/add-maintenance/add-maintenance.component';
import { ViewMaintenanceComponent} from './Maintenance/view-maintenance/view-maintenance.component';
import {MapMainComponent} from './SiteMap/map-main/map-main.component';
import {RemarksComponent} from './SiteMap/remarks/remarks.component';
import {SearchMapComponent} from './SiteMap/search-map/search-map.component';
import {SiteStatusComponent} from './SiteMap/site-status/site-status.component';
import {StatusReportComponent} from './SiteMap/status-report/status-report.component';
import {ViewSiteComponent} from './Site Management/view-site/view-site.component';
import {AddVisitorsComponent} from './Security_Details/add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './Security_Details/view-visitors/view-visitors.component';
import {ViewIncidentsComponent} from './Security_Details/view-incidents/view-incidents.component';
import {AddIncidentsComponent} from './Security_Details/add-incidents/add-incidents.component';
import {OwnedTowersComponent} from './TowerLoading/owned-towers/owned-towers.component';
import {CalculationComponent} from './TowerLoading/calculation/calculation.component';
import {ViewOngoingProjectComponent} from './OngoingProject/view-ongoing-project/view-ongoing-project.component';
import {AddNewProjectComponent} from './OngoingProject/add-new-project/add-new-project.component';
import {PhyscialMeasurementComponent} from './TowerLoading/physcial-measurement/physcial-measurement.component';
import {AddRegionComponent} from './Region-Management/add-region/add-region.component';
import {ViewSiteDetailsComponent} from './Site Management/view-site-details/view-site-details.component';
import {AddAntennaComponent} from './TowerLoading/add-antenna/add-antenna.component';

const routes: Routes = [
  {path: 'spec-nav', component: SpecNavComponent},
  {path: 'add-maintenance', component: AddMaintenanceComponent},
  {path: 'view-maintenance', component: ViewMaintenanceComponent },
  {path: 'map-main', component: MapMainComponent},
  {path: 'remarks', component: RemarksComponent},
  {path: 'search-map', component: SearchMapComponent},
  {path: 'site-status', component: SiteStatusComponent},
  {path: 'status-report', component: StatusReportComponent},
  {path: 'view-site', component: ViewSiteComponent},
  {path: 'add-visitors', component: AddVisitorsComponent},
  {path: 'view-visitors', component: ViewVisitorsComponent},
  {path: 'view-incidents', component: ViewIncidentsComponent},
  {path: 'add-incidents', component: AddIncidentsComponent},
  {path: 'owned-towers', component: OwnedTowersComponent},
  {path: 'physical-measurment', component: PhyscialMeasurementComponent},
  {path: 'calculation', component: CalculationComponent},
  {path: 'add-new-project', component: AddNewProjectComponent },
  {path: 'view-ongoing-project', component: ViewOngoingProjectComponent},
  {path: 'add-region', component: AddRegionComponent},
  {path: 'view-site-details', component: ViewSiteDetailsComponent},
  {path: 'add-region', component: AddRegionComponent},
  {path: 'add-antenna', component: AddAntennaComponent}];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
