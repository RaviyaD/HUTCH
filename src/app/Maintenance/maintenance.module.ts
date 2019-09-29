import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddMaintenanceComponent} from './add-maintenance/add-maintenance.component';
import { ViewMaintenanceComponent} from './view-maintenance/view-maintenance.component';
import { ResolveMaintenanceComponent} from './resolve-maintenance/resolve-maintenance.component';
import {MaterialModule} from '../site-management/material.module';
import { MaintenanaceRoutingModule} from './maintenanace-routing.module';
import { ViewContractorsComponent } from './Contractors/view-contractors/view-contractors.component';
import { AddContractorComponent } from './Contractors/add-contractor/add-contractor.component';
import { CompleteMaintenanceComponent } from './complete-maintenance/complete-maintenance.component';
import { ConfirmDeleteboxComponent } from './confirm-deletebox/confirm-deletebox.component';

@NgModule({
  declarations: [
    AddMaintenanceComponent,
    ViewMaintenanceComponent,
    ResolveMaintenanceComponent,
    ViewContractorsComponent,
    AddContractorComponent,
    CompleteMaintenanceComponent,
    ConfirmDeleteboxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaintenanaceRoutingModule
  ],
  entryComponents: [ResolveMaintenanceComponent, AddContractorComponent, CompleteMaintenanceComponent, ConfirmDeleteboxComponent],
  providers: [DatePipe],
})




export class MaintenanceModule { }
