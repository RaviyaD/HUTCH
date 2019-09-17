import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../site-management/material.module';
import {AddVisitorsComponent} from './add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './view-visitors/view-visitors.component';
import {ViewIncidentsComponent} from './view-incidents/view-incidents.component';
import {AddIncidentsComponent} from './add-incidents/add-incidents.component';
import {ViewSiteSecurityPersonComponent} from './view-site-security-person/view-site-security-person.component';
import {AddSiteSecurityPersonComponent} from './add-site-security-person/add-site-security-person.component';
import {SecuritydetailsRoutingModule} from './securitydetails-routing.module';

@NgModule({
  declarations: [
    AddVisitorsComponent,
    ViewVisitorsComponent,
    ViewIncidentsComponent,
    AddIncidentsComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SecuritydetailsRoutingModule
    ],
})

export class SecuritydetailsModule { }
