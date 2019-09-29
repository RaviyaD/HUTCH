import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RemarksComponent} from './remarks/remarks.component';
import {SearchMapComponent} from './search-map/search-map.component';
import {SiteStatusComponent} from './site-status/site-status.component';
import {StatusReportComponent} from './status-report/status-report.component';
import {AddremarkComponent} from './addremark/addremark.component';
import {SearchLocationsComponent} from './search-locations/search-locations.component';
import {MapComponent} from './map/map.component';
import {StatusMapComponent} from './status-map/status-map.component';
import {UpsitesMapComponent} from './status-map/upsites-map/upsites-map.component';
import {DownsitesMapComponent} from './status-map/downsites-map/downsites-map.component';
import {MaintainsitesMapComponent} from './status-map/maintainsites-map/maintainsites-map.component';
import {DirectionMapComponent} from './direction-map/direction-map.component';


const appRoutes: Routes = [
  {path: 'remarks', component: RemarksComponent},
  {path: 'search-map', component: SearchMapComponent},
  {path: 'site-status', component: SiteStatusComponent},
  {path: 'status-report', component: StatusReportComponent},
  {path: 'MapRemark', component: RemarksComponent},
  {path: 'createRemark', component: AddremarkComponent },
  {path: 'search-locations/:siteName', component: SearchLocationsComponent},
  {path: 'map/:siteName', component: MapComponent},
  {path: 'status-map', component: StatusMapComponent},
  {path: 'upsitesmap', component: UpsitesMapComponent},
  {path: 'downsitesmap', component: DownsitesMapComponent},
  {path: 'maintainmap', component: MaintainsitesMapComponent},
  {path: 'directionmap', component: DirectionMapComponent},
  {path: 'directmap/:siteName', component: DirectionMapComponent},

];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class SiteMapRoutingModule { }
