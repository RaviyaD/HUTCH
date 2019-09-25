import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../site-management/material.module';
import { ProjectRoutingModule} from './project-routing.module';
import {AddNewProjectComponent} from './add-new-project/add-new-project.component';
import {ViewOngoingProjectComponent} from './view-ongoing-project/view-ongoing-project.component';


@NgModule({
  declarations: [
    AddNewProjectComponent,
    ViewOngoingProjectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule
  ],
  entryComponents: [],
})




export class ProjectModule { }
