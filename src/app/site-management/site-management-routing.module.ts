import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewSiteDetailsComponent} from './view-site-details/view-site-details.component';
import {ViewSiteComponent} from './view-site/view-site.component';
import {ViewAllSitesComponent} from './view-all-sites/view-all-sites.component';
import {AddSiteDetailsComponent} from './add-site-details/add-site-details.component';

const appRoutes: Routes = [
  {path: '', component: ViewSiteComponent},
  {path: 'view-site', component: ViewSiteComponent},
  {path: 'view-site-details', component: ViewSiteDetailsComponent},
  {path: 'view-site-details/:siteID', component: ViewSiteDetailsComponent},
  {path: 'view-all-sites', component: ViewAllSitesComponent},
  {path: 'add-site-details', component: AddSiteDetailsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class SiteManagementRoutingModule {}
