// Core Modules
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavComponent} from './side-nav/side-nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './site-management/material.module';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {GoogleChartsModule} from 'angular-google-charts';


// Routing Module
import {AppRoutingModule} from './app-routing.module';


// Services
import {MaintenanceServicesService} from './Maintenance/view-maintenance/MaintenanceServices';
import {UserServiceService} from './Specification/service/user-service.service';
import {SpLogService} from './Specification/service/sp-log.service';
import {RemarkServiceService} from './SiteMap/service/remark-service.service';
import {ZoneServices} from './Region-Management/zoneService';
import {IncidentService} from './Security_Details/IncidentService';
import {TowerService} from './TowerLoading/physical-measurement/Tower.service';
import {OwnedService} from './TowerLoading/owned-towers/Owned.service';
import {ProjectServicesService} from './OngoingProject/view-ongoing-project/ProjectServices';
import {SiteDetailsService} from './site-management/site-details.service';


// Module
import { TowerModule } from './TowerLoading/tower.module';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TowerModule,
    ChartsModule,
    GoogleChartsModule.forRoot()
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
  bootstrap: [AppComponent ]
})

export class AppModule { }
