import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageContentComponent} from './page-content/page-content.component';

const appRoutes: Routes = [
  {path: 'page-content', component: PageContentComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
