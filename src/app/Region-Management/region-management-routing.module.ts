import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddRegionComponent} from './add-region/add-region.component';
import {ViewRegionZoneComponent} from './view-region-zone/view-region-zone.component';
import {ViewRegionComponent} from './view-region/view-region.component';
import {AddSubregionComponent} from './add-subregion/add-subregion.component';


const appRoutes: Routes = [
  {path: 'add-region', component: AddRegionComponent},
  {path: 'add-subregion', component: AddSubregionComponent},
  {path: 'view-region-zone', component: ViewRegionZoneComponent},
  {path: 'view-region', component: ViewRegionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RegionManagementRoutingModule { }
