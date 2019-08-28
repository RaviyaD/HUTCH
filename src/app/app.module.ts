import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavComponent} from './side-nav/side-nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './site-management/material.module';
import {AddVisitorsComponent} from './Security_Details/add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './Security_Details/view-visitors/view-visitors.component';
import {SpecNavComponent} from './Specification/spec-nav/spec-nav.component';
import {SpecComponent} from './Specification/spec/spec.component';
import {SpecLogTableComponent} from './Specification/spec-log-table/spec-log-table.component';
import {SpecViewComComponent} from './Specification/spec-view-com/spec-view-com.component';
import {PhyscialMeasurementComponent} from './TowerLoading/physcial-measurement/physcial-measurement.component';
import {CalculationComponent} from './TowerLoading/calculation/calculation.component';
import {ViewOngoingProjectComponent} from './OngoingProject/view-ongoing-project/view-ongoing-project.component';
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
import {SiteDetailsService} from './site-management/site-details.service';
import {RemarkServiceService} from './SiteMap/service/remark-service.service';
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
    SpecNavComponent,
    SpecComponent,
    SpecLogTableComponent,
    SpecViewComComponent,
    AddVisitorsComponent,
    ViewVisitorsComponent,
    OwnedTowersComponent,
    PhyscialMeasurementComponent,
    CalculationComponent,
    ViewOngoingProjectComponent,
    AddNewProjectComponent,
    CalculationComponent,
    AddAntennaComponent,
    ViewIncidentsComponent,
    AddIncidentsComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent,
    AddIncidentsComponent,
    SpecLogInComponent,
    SpecUploadFormComponent,
    EditSpecComponent,
    AddIncidentsComponent,
    PhyscialMeasurementComponent,
    OwnedTowersComponent,
    CalculationComponent,
    AddAntennaComponent,
    AddusageComponent,
    EditantennaComponent,
    EditusageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  //  RegionManagementModule,
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
  entryComponents: [EditusageComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
