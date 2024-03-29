import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../site-management/material.module';
import {AddRegionComponent} from './add-region/add-region.component';
import {ViewRegionComponent} from './view-region/view-region.component';
import {ViewRegionZoneComponent} from './view-region-zone/view-region-zone.component';
import {RegionManagementRoutingModule} from './region-management-routing.module';
import { AddSubregionComponent } from './add-subregion/add-subregion.component';
import {EditZoneComponent} from './edit-zone/edit-zone.component';

@NgModule({
  declarations: [
    AddRegionComponent,
    ViewRegionComponent,
    ViewRegionZoneComponent,
    AddSubregionComponent,
    EditZoneComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RegionManagementRoutingModule
  ],


})
export class RegionManagementModule { }
