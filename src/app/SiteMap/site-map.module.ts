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



@NgModule({
  declarations: [
    MapComponent,
    RemarksComponent,
    SearchMapComponent,
    SiteStatusComponent,
    StatusReportComponent,
    AddremarkComponent,
    RemarkDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCkBk3eKkKjRgv25gFD9YuOF59Fwijt3wk'}),
    SiteMapRoutingModule
  ],
  entryComponents: [RemarkDialogComponent]
})
export class SiteMapModule { }
