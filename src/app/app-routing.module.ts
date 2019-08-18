import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecNavComponent} from './Specification/spec-nav/spec-nav.component';
import { AddMaintenanceComponent} from './Maintenance/add-maintenance/add-maintenance.component';

const routes: Routes = [
  {path: 'spec-nav', component: SpecNavComponent},
  {path: 'add-maintenance', component: AddMaintenanceComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
