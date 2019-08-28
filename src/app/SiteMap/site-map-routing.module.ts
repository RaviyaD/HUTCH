import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RemarksComponent} from './remarks/remarks.component';
import {SearchMapComponent} from './search-map/search-map.component';
import {SiteStatusComponent} from './site-status/site-status.component';
import {StatusReportComponent} from './status-report/status-report.component';
import {AddremarkComponent} from './addremark/addremark.component';


const appRoutes: Routes = [
  {path: 'remarks', component: RemarksComponent},
  {path: 'search-map', component: SearchMapComponent},
  {path: 'site-status', component: SiteStatusComponent},
  {path: 'status-report', component: StatusReportComponent},
  {path: 'MapRemark', component: RemarksComponent},
  {path: 'createRemark', component: AddremarkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class SiteMapRoutingModule { }
