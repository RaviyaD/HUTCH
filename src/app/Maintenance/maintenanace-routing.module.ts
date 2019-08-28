import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddMaintenanceComponent} from './add-maintenance/add-maintenance.component';
import {ViewMaintenanceComponent} from './view-maintenance/view-maintenance.component';


const appRoutes: Routes = [
  {path: 'add-maintenance', component: AddMaintenanceComponent},
  {path: 'view-maintenance', component: ViewMaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class MaintenanaceRoutingModule { }
