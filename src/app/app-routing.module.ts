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

const routes: Routes = [
  {path: 'spec-nav', component: SpecNavComponent},
  {path: 'add-maintenance', component: AddMaintenanceComponent},
  {path: 'view-maintenance', component: ViewMaintenanceComponent },
  {path: 'map-main', component: MapMainComponent},
  {path: 'remarks', component: RemarksComponent},
  {path: 'search-map', component: SearchMapComponent},
  {path: 'site-status', component: SiteStatusComponent},
  {path: 'status-report', component: StatusReportComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
