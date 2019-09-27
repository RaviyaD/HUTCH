import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddMaintenanceComponent} from './add-maintenance/add-maintenance.component';
import {ViewMaintenanceComponent} from './view-maintenance/view-maintenance.component';
import {ViewContractorsComponent} from './Contractors/view-contractors/view-contractors.component';


const appRoutes: Routes = [
  {path: 'add-maintenance', component: AddMaintenanceComponent},
  {path: 'view-maintenance', component: ViewMaintenanceComponent },
  {path: 'view-contractors', component: ViewContractorsComponent },
  {path: 'view-maintenance/:cname', component: ViewMaintenanceComponent},
  {path: 'view-contractors/:cname', component: ViewContractorsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class MaintenanaceRoutingModule { }
