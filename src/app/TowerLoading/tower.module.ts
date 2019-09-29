import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule} from '../site-management/material.module';

import { TowerRoutingModule} from './tower-routing.module';

import {PhysicalMeasurementComponent} from './physical-measurement/physical-measurement.component';
import {CalculationComponent} from './calculation/calculation.component';
import {AddAntennaComponent} from './add-antenna/add-antenna.component';
import {OwnedTowersComponent} from './owned-towers/owned-towers.component';
import {AddusageComponent} from './addusage/addusage.component';
import {EditantennaComponent} from './editantenna/editantenna.component';
import { SummaryComponent } from './summary/summary.component';
import {HighchartsChartComponent} from 'highcharts-angular';

@NgModule({
  declarations: [
    PhysicalMeasurementComponent,
    AddAntennaComponent,
    CalculationComponent,
    OwnedTowersComponent,
    AddusageComponent,
    EditantennaComponent,
    SummaryComponent,
    HighchartsChartComponent
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
