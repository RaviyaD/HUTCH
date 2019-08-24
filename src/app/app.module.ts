import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {MapMainComponent} from './SiteMap/map-main/map-main.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddMaintenanceComponent } from './Maintenance/add-maintenance/add-maintenance.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './Site Management/material.module';
import { ViewSiteComponent} from './Site Management/view-site/view-site.component';
import { AddVisitorsComponent} from './Security_Details/add-visitors/add-visitors.component';
import { ViewVisitorsComponent} from './Security_Details/view-visitors/view-visitors.component';
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
import { OwnedTowersComponent } from './TowerLoading/owned-towers/owned-towers.component';
import { PhyscialMeasurementComponent } from './TowerLoading/physcial-measurement/physcial-measurement.component';
import { CalculationComponent } from './TowerLoading/calculation/calculation.component';
import { AddNewProjectComponent} from './OngoingProject/add-new-project/add-new-project.component';
import { ViewOngoingProjectComponent} from './OngoingProject/view-ongoing-project/view-ongoing-project.component';
import { AddRegionComponent } from './Region-Management/add-region/add-region.component';
import { HttpClientModule} from '@angular/common/http';
import { MaintenanceServicesService} from './Maintenance/view-maintenance/MaintenanceServices';
import { AddAntennaComponent} from './TowerLoading/add-antenna/add-antenna.component';
import { ViewIncidentsComponent} from './Security_Details/view-incidents/view-incidents.component';
import { AddIncidentsComponent} from './Security_Details/add-incidents/add-incidents.component';
import { MatDialogRef} from '@angular/material';
import {ViewSiteSecurityPersonComponent} from './Security_Details/view-site-security-person/view-site-security-person.component';
import {AddSiteSecurityPersonComponent} from './Security_Details/add-site-security-person/add-site-security-person.component';
import {IncidentService} from './Security_Details/IncidentService';
import { ResolveMaintenanceComponent } from './Maintenance/resolve-maintenance/resolve-maintenance.component';

import { AddIncidentsComponent } from './Security_Details/add-incidents/add-incidents.component';
import { ViewSiteSecurityPersonComponent } from './Security_Details/view-site-security-person/view-site-security-person.component';
import { AddSiteSecurityPersonComponent } from './Security_Details/add-site-security-person/add-site-security-person.component';
import {OwnedTowersComponent} from './TowerLoading/owned-towers/owned-towers.component';
import {PhyscialMeasurementComponent} from './TowerLoading/physcial-measurement/physcial-measurement.component';
import { ViewSiteDetailsComponent } from './Site Management/view-site-details/view-site-details.component';
import {SiteServiceService} from './Site Management/site-service.service';
import {SiteDetailsService} from './Site Management/site-details.service';
import {HttpClientModule} from "@angular/common/http";

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
    AddVisitorsComponent,
    ViewVisitorsComponent,
    OwnedTowersComponent,
    PhyscialMeasurementComponent,
    CalculationComponent,
    ViewOngoingProjectComponent,
    AddNewProjectComponent,
    CalculationComponent,
    AddRegionComponent,
    AddAntennaComponent,
    ViewIncidentsComponent,
    AddIncidentsComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent
    AddIncidentsComponent,
    ResolveMaintenanceComponent,
    AddRegionComponent,
    ViewSiteDetailsComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCkBk3eKkKjRgv25gFD9YuOF59Fwijt3wk'}),
  ],
  providers: [
    MaintenanceServicesService,
    SiteServiceService,
    SiteDetailsService
  ],
  entryComponents: [ResolveMaintenanceComponent],
  providers: [MaintenanceServicesService],
  providers: [MaintenanceServicesService, IncidentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
