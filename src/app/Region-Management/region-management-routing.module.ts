import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddRegionComponent} from './add-region/add-region.component';
import {ViewRegionZoneComponent} from './view-region-zone/view-region-zone.component';
import {ViewRegionComponent} from './view-region/view-region.component';


const appRoutes: Routes = [
  {path: 'add-region', component: AddRegionComponent},
  {path: 'view-region-zone', component: ViewRegionZoneComponent},
  {path: 'view-region', component: ViewRegionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RegionManagementRoutingModule { }
