import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from './map/map.component';
import {RemarksComponent} from './remarks/remarks.component';
import {SearchMapComponent} from './search-map/search-map.component';
import {SiteStatusComponent} from './site-status/site-status.component';
import {StatusReportComponent} from './status-report/status-report.component';
import {AddremarkComponent} from './addremark/addremark.component';
import {RemarkDialogComponent} from './remark-dialog/remark-dialog.component';
import {AgmCoreModule} from '@agm/core';
import {MaterialModule} from '../site-management/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SiteMapRoutingModule} from './site-map-routing.module';
import { SearchLocationsComponent } from './search-locations/search-locations.component';
import { StatusMapComponent } from './status-map/status-map.component';
import { UpsitesMapComponent } from './status-map/upsites-map/upsites-map.component';
import { DownsitesMapComponent } from './status-map/downsites-map/downsites-map.component';
import { MaintainsitesMapComponent } from './status-map/maintainsites-map/maintainsites-map.component';



@NgModule({
  declarations: [
    MapComponent,
    RemarksComponent,
    SearchMapComponent,
    SiteStatusComponent,
    StatusReportComponent,
    AddremarkComponent,
    RemarkDialogComponent,
    SearchLocationsComponent,
    StatusMapComponent,
    UpsitesMapComponent,
    DownsitesMapComponent,
    MaintainsitesMapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDiC1SSoFYcBl_SRPWnvKCVhfUfAmdHWn4'}),
    SiteMapRoutingModule
  ],
  entryComponents: [RemarkDialogComponent]
})
export class SiteMapModule { }
