import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpecificationComponent} from './specification/specification.component';


const routes: Routes = [{path: 'specification', component: SpecificationComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
