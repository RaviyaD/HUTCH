import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddVisitorsComponent} from './add-visitors/add-visitors.component';
import {ViewVisitorsComponent} from './view-visitors/view-visitors.component';
import {ViewIncidentsComponent} from './view-incidents/view-incidents.component';
import {AddIncidentsComponent} from './add-incidents/add-incidents.component';
import {ViewSiteSecurityPersonComponent} from './view-site-security-person/view-site-security-person.component';
import {AddSiteSecurityPersonComponent} from './add-site-security-person/add-site-security-person.component';

const appRoutes: Routes = [
  {path: 'add-incidents', component: AddIncidentsComponent},
  {path: 'view-incidents', component: ViewIncidentsComponent },
  {path: 'add-visitors', component: AddVisitorsComponent },
  {path: 'view-visitors', component: ViewVisitorsComponent },
  {path: 'add-site-security-person', component: AddSiteSecurityPersonComponent },
  {path: 'view-site-security-person', component: ViewSiteSecurityPersonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})

export class SecuritydetailsRoutingModule { }
