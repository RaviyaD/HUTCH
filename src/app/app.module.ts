import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavComponent} from './side-nav/side-nav.component';
import {AddMaintenanceComponent} from './Maintenance/add-maintenance/add-maintenance.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './site-management/material.module';
import {AddVisitorsComponent} from './Security_Details/add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './Security_Details/view-visitors/view-visitors.component';
import {SpecNavComponent} from './Specification/spec-nav/spec-nav.component';
import {SpecComponent} from './Specification/spec/spec.component';
import {SpecLogTableComponent} from './Specification/spec-log-table/spec-log-table.component';
import {SpecViewComComponent} from './Specification/spec-view-com/spec-view-com.component';
import {ViewMaintenanceComponent} from './Maintenance/view-maintenance/view-maintenance.component';
import {MapComponent} from './SiteMap/map/map.component';
import {RemarksComponent} from './SiteMap/remarks/remarks.component';
import {SearchMapComponent} from './SiteMap/search-map/search-map.component';
import {SiteStatusComponent} from './SiteMap/site-status/site-status.component';
import {StatusReportComponent} from './SiteMap/status-report/status-report.component';
import {AgmCoreModule} from '@agm/core';
import {PhyscialMeasurementComponent} from './TowerLoading/physcial-measurement/physcial-measurement.component';
import {CalculationComponent} from './TowerLoading/calculation/calculation.component';
import {ViewOngoingProjectComponent} from './OngoingProject/view-ongoing-project/view-ongoing-project.component';
import {AddRegionComponent} from './Region-Management/add-region/add-region.component';
import {HttpClientModule} from '@angular/common/http';
import {MaintenanceServicesService} from './Maintenance/view-maintenance/MaintenanceServices';
import {AddAntennaComponent} from './TowerLoading/add-antenna/add-antenna.component';
import {ViewIncidentsComponent} from './Security_Details/view-incidents/view-incidents.component';
import {AddIncidentsComponent} from './Security_Details/add-incidents/add-incidents.component';
import {ViewSiteSecurityPersonComponent} from './Security_Details/view-site-security-person/view-site-security-person.component';
import {AddSiteSecurityPersonComponent} from './Security_Details/add-site-security-person/add-site-security-person.component';
import {OwnedTowersComponent} from './TowerLoading/owned-towers/owned-towers.component';
import {AddNewProjectComponent} from './OngoingProject/add-new-project/add-new-project.component';
import {UserServiceService} from './Specification/service/user-service.service';
import {SpLogService} from './Specification/service/sp-log.service';
import {SpecLogInComponent} from './Specification/spec-log-in/spec-log-in.component';
import {SpecUploadFormComponent} from './Specification/spec-upload-form/spec-upload-form.component';
import {EditSpecComponent} from './Specification/dialog/edit-spec/edit-spec.component';
import {ResolveMaintenanceComponent} from './Maintenance/resolve-maintenance/resolve-maintenance.component';
import {SiteDetailsService} from './site-management/site-details.service';
import {AddremarkComponent} from './SiteMap/addremark/addremark.component';
import {RemarkServiceService} from './SiteMap/service/remark-service.service';
import {RemarkDialogComponent} from './SiteMap/remark-dialog/remark-dialog.component';
import {ViewRegionComponent} from './Region-Management/view-region/view-region.component';
import {ViewRegionZoneComponent} from './Region-Management/view-region-zone/view-region-zone.component';
import {ZoneServices} from './Region-Management/zoneService';
import {IncidentService} from './Security_Details/IncidentService';
import {ProjectServicesService} from './OngoingProject/view-ongoing-project/ProjectServices';
import {TowerService} from './TowerLoading/physcial-measurement/Tower.service';
import {OwnedService} from './TowerLoading/owned-towers/Owned.service';
import {AddusageComponent} from './TowerLoading/addusage/addusage.component';
import {EditantennaComponent} from './TowerLoading/editantenna/editantenna.component';
import {EditusageComponent} from './TowerLoading/editusage/editusage.component';

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
    MapComponent,
    RemarksComponent,
    SearchMapComponent,
    SiteStatusComponent,
    StatusReportComponent,
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
    ResolveMaintenanceComponent,
    AddRegionComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent,
    ResolveMaintenanceComponent,
    AddSiteSecurityPersonComponent,
    AddremarkComponent,
    RemarkDialogComponent,
    AddIncidentsComponent,
    SpecLogInComponent,
    SpecUploadFormComponent,
    EditSpecComponent,
    ViewRegionComponent,
    ViewRegionZoneComponent,
    AddIncidentsComponent,
    PhyscialMeasurementComponent,
    OwnedTowersComponent,
    CalculationComponent,
    AddAntennaComponent,
    AddusageComponent,
    EditantennaComponent,
    EditusageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCkBk3eKkKjRgv25gFD9YuOF59Fwijt3wk'}),
  ],
  providers: [
    MaintenanceServicesService,
    SiteDetailsService,
    RemarkServiceService,
    UserServiceService,
    SpLogService,
    ZoneServices,
    IncidentService,
    ProjectServicesService,
    TowerService,
    OwnedService,
  ],
  entryComponents: [ResolveMaintenanceComponent, RemarkDialogComponent, EditusageComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
