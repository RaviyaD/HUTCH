import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddMaintenanceComponent} from './add-maintenance/add-maintenance.component';
import { ViewMaintenanceComponent} from './view-maintenance/view-maintenance.component';
import { ResolveMaintenanceComponent} from './resolve-maintenance/resolve-maintenance.component';
import {MaterialModule} from '../site-management/material.module';
import { MaintenanaceRoutingModule} from './maintenanace-routing.module';

@NgModule({
  declarations: [
    AddMaintenanceComponent,
    ViewMaintenanceComponent,
    ResolveMaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaintenanaceRoutingModule
  ],
  entryComponents: [ResolveMaintenanceComponent],
})




export class MaintenanceModule { }
