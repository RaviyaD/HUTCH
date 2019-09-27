import {NgModule} from '@angular/core';
import {PageContentComponent} from './page-content/page-content.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    PageContentComponent
  ],
  imports: [
    DashboardRoutingModule,
    ChartsModule
  ],
  entryComponents: [],
})

export class DashboardModule { }
