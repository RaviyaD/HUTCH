import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddNewProjectComponent} from './add-new-project/add-new-project.component';
import {ViewOngoingProjectComponent} from './view-ongoing-project/view-ongoing-project.component';


const appRoutes: Routes = [
  {path: 'add-new-project', component: AddNewProjectComponent},
  {path: 'view-ongoing-project', component: ViewOngoingProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
