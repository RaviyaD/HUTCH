import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../site-management/material.module';
import { ProjectRoutingModule} from './project-routing.module';
import {AddNewProjectComponent} from './add-new-project/add-new-project.component';
import {ViewOngoingProjectComponent} from './view-ongoing-project/view-ongoing-project.component';
import { UpdateOngoingProjectComponent } from './update-ongoing-project/update-ongoing-project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AddNewProjectComponent,
    ViewOngoingProjectComponent,
    UpdateOngoingProjectComponent,
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    DragDropModule
  ],
  entryComponents: [UpdateOngoingProjectComponent],
})




export class ProjectModule { }
