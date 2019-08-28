import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule} from '../site-management/material.module';

import { TowerRoutingModule} from './tower-routing.module';

import {PhyscialMeasurementComponent} from './physcial-measurement/physcial-measurement.component';
import {CalculationComponent} from './calculation/calculation.component';
import {AddAntennaComponent} from './add-antenna/add-antenna.component';
import {OwnedTowersComponent} from './owned-towers/owned-towers.component';
import {AddusageComponent} from './addusage/addusage.component';
import {EditantennaComponent} from './editantenna/editantenna.component';




@NgModule({
  declarations: [
    PhyscialMeasurementComponent,
    AddAntennaComponent,
    CalculationComponent,
    OwnedTowersComponent,
    AddusageComponent,
    EditantennaComponent,
    EditantennaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TowerRoutingModule
  ],
})
export class TowerModule { }
