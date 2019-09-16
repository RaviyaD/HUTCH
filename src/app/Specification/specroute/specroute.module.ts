import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { SpecrouteRoutingModule } from './specroute-routing.module';
import {SpecNavComponent} from '../spec-nav/spec-nav.component';
import {SpecLogInComponent} from '../spec-log-in/spec-log-in.component';
import {SpecViewComComponent} from '../spec-view-com/spec-view-com.component';
import {SpecComponent} from '../spec/spec.component';
import {SpecLogTableComponent} from '../spec-log-table/spec-log-table.component';
import {SpecUploadFormComponent} from '../spec-upload-form/spec-upload-form.component';
import {EditSpecComponent} from '../dialog/edit-spec/edit-spec.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../site-management/material.module';


@NgModule({
  declarations: [
    SpecNavComponent,
    SpecComponent,
    SpecLogTableComponent,
    SpecViewComComponent,
    SpecLogInComponent,
    SpecUploadFormComponent,
    EditSpecComponent,
  ],
  imports: [
    CommonModule,
    SpecrouteRoutingModule,
    MatTabsModule,
    FormsModule,
    MaterialModule

  ]
})
export class SpecrouteModule { }
