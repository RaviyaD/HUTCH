import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {MapMainComponent} from './SiteMap/map-main/map-main.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddMaintenanceComponent } from './Maintenance/add-maintenance/add-maintenance.component';
import {MatAutocompleteModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpecNavComponent } from './Specification/spec-nav/spec-nav.component';
import { SpecComponent } from './Specification/spec/spec.component';
import { SpecLogTableComponent } from './Specification/spec-log-table/spec-log-table.component';
import { SpecViewComComponent } from './Specification/spec-view-com/spec-view-com.component';
import { ViewMaintenanceComponent } from './Maintenance/view-maintenance/view-maintenance.component';
import {MapComponent} from './SiteMap/map/map.component';
import {RemarksComponent} from './SiteMap/remarks/remarks.component';
import {SearchMapComponent} from './SiteMap/search-map/search-map.component';
import {SiteStatusComponent} from './SiteMap/site-status/site-status.component';
import {StatusReportComponent} from './SiteMap/status-report/status-report.component';
import { AgmCoreModule } from '@agm/core';
import { ViewSiteComponent } from './Site Management/view-site/view-site.component';
import {MaterialModule} from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AddMaintenanceComponent,
    SpecNavComponent,
    SpecComponent,
    SpecLogTableComponent,
    SpecViewComComponent,
    ViewMaintenanceComponent,
    MapMainComponent,
    MapComponent,
    RemarksComponent,
    SearchMapComponent,
    SiteStatusComponent,
    StatusReportComponent,
    ViewSiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCkBk3eKkKjRgv25gFD9YuOF59Fwijt3wk'}),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
