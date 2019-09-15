// Core Modules
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavComponent} from './side-nav/side-nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './site-management/material.module';
import {HttpClientModule} from '@angular/common/http';



// Routing Module
import {AppRoutingModule} from './app-routing.module';


// Services
import {MaintenanceServicesService} from './Maintenance/view-maintenance/MaintenanceServices';
import {UserServiceService} from './Specification/service/user-service.service';
import {SpLogService} from './Specification/service/sp-log.service';
import {RemarkServiceService} from './SiteMap/service/remark-service.service';
import {ZoneServices} from './Region-Management/zoneService';
import {IncidentService} from './Security_Details/IncidentService';
import {TowerService} from './TowerLoading/physcial-measurement/Tower.service';
import {OwnedService} from './TowerLoading/owned-towers/Owned.service';
import {ProjectServicesService} from './OngoingProject/view-ongoing-project/ProjectServices';
import {SiteDetailsService} from './site-management/site-details.service';


// Component
import {AddVisitorsComponent} from './Security_Details/add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './Security_Details/view-visitors/view-visitors.component';
import {ViewOngoingProjectComponent} from './OngoingProject/view-ongoing-project/view-ongoing-project.component';
import {ViewIncidentsComponent} from './Security_Details/view-incidents/view-incidents.component';
import {AddIncidentsComponent} from './Security_Details/add-incidents/add-incidents.component';
import {ViewSiteSecurityPersonComponent} from './Security_Details/view-site-security-person/view-site-security-person.component';
import {AddSiteSecurityPersonComponent} from './Security_Details/add-site-security-person/add-site-security-person.component';
import {AddNewProjectComponent} from './OngoingProject/add-new-project/add-new-project.component';





// Module
import { TowerModule } from './TowerLoading/tower.module';



@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AddVisitorsComponent,
    ViewVisitorsComponent,
    ViewOngoingProjectComponent,
    AddNewProjectComponent,
    ViewIncidentsComponent,
    AddIncidentsComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent,
    AddIncidentsComponent,

    AddIncidentsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TowerModule

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
  bootstrap: [AppComponent]
})

export class AppModule { }
