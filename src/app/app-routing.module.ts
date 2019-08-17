import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecificationComponent} from './specification/specification.component';
import { AddMaintenanceComponent} from './Maintenance/add-maintenance/add-maintenance.component';

const routes: Routes = [{path: 'specification', component: SpecificationComponent },
  {path: 'add-maintenance', component: AddMaintenanceComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
