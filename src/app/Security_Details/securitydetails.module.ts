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
import { UpdateVisitorsComponent } from './update-visitors/update-visitors.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UpdateSecurityComponent } from './update-security/update-security.component';

@NgModule({
  declarations: [
    AddVisitorsComponent,
    ViewVisitorsComponent,
    ViewIncidentsComponent,
    AddIncidentsComponent,
    ViewSiteSecurityPersonComponent,
    AddSiteSecurityPersonComponent,
    UpdateVisitorsComponent,
    UpdateSecurityComponent
    ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SecuritydetailsRoutingModule,
    DragDropModule
    ],

  entryComponents: [UpdateVisitorsComponent, UpdateSecurityComponent],

})

export class SecuritydetailsModule { }
