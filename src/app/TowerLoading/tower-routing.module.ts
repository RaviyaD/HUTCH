import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OwnedTowersComponent} from './owned-towers/owned-towers.component';
import {CalculationComponent} from './calculation/calculation.component';
import {PhyscialMeasurementComponent} from './physcial-measurement/physcial-measurement.component';
import {AddAntennaComponent} from './add-antenna/add-antenna.component';
import {AddusageComponent} from './addusage/addusage.component';
import {EditantennaComponent} from './editantenna/editantenna.component';

const appRoutes: Routes = [
  {path: 'owned-towers', component: OwnedTowersComponent},
  {path: 'physical-measurment', component: PhyscialMeasurementComponent},
  {path: 'calculation', component: CalculationComponent},
  {path: 'add-antenna', component: AddAntennaComponent},
  {path: 'add-usage', component: AddusageComponent},
  {path: 'edit-antenna', component: EditantennaComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
  }
)

export class TowerRoutingModule {}

