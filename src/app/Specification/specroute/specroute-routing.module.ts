import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecNavComponent} from '../spec-nav/spec-nav.component';
import {SpecLogTableComponent} from '../spec-log-table/spec-log-table.component';


const routes: Routes = [
  {path: 'spec-nav', component: SpecNavComponent},
  {path: 'addSpec', component: SpecLogTableComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecrouteRoutingModule { }
