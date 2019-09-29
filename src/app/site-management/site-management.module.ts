import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddSiteDetailsComponent} from './add-site-details/add-site-details.component';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewSiteComponent} from './view-site/view-site.component';
import {ViewSiteDetailsComponent} from './view-site-details/view-site-details.component';
import {ViewAllSitesComponent} from './view-all-sites/view-all-sites.component';
import {SiteManagementRoutingModule} from './site-management-routing.module';
import {GoogleChartsModule} from 'angular-google-charts';

@NgModule({
  declarations: [
    AddSiteDetailsComponent,
    ViewSiteComponent,
    ViewSiteDetailsComponent,
    ViewAllSitesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SiteManagementRoutingModule,
    GoogleChartsModule
  ]
})
export class SiteManagementModule { }
