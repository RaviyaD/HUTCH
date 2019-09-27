import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [

  // Load Children
  {path: 'Site', loadChildren: () => import('./site-management/site-management.module').then( mod => mod.SiteManagementModule )},
  {path: 'Maintenance', loadChildren: () => import('./Maintenance/maintenance.module').then( mod => mod.MaintenanceModule )},
  {path: 'siteMap', loadChildren: () => import('./SiteMap/site-map.module').then(mod => mod.SiteMapModule)},
  {path: 'Tower', loadChildren: () => import('./TowerLoading/tower.module').then(mod => mod.TowerModule)},
  {path: 'Region', loadChildren: () => import ('./Region-Management/region-management.module').then(mod => mod.RegionManagementModule)},
  {path: 'Spec', loadChildren: () => import('./Specification/specroute/specroute.module').then(mod => mod.SpecrouteModule)},
  {path: 'Ongoing', loadChildren: () => import('./OngoingProject/project.module').then(mod => mod.ProjectModule)},
  {path: 'Security', loadChildren: () => import('./Security_Details/securitydetails.module').then(mod => mod.SecuritydetailsModule)},
  {path: 'Dashboard', loadChildren: () => import('./DashBoard/dashboard.module').then(mod => mod.DashboardModule)},
  {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
