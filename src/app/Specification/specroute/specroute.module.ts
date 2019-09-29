import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatTabsModule} from '@angular/material';

import { SpecrouteRoutingModule } from './specroute-routing.module';
import {SpecNavComponent} from '../spec-nav/spec-nav.component';
import {SpecLogInComponent} from '../spec-log-in/spec-log-in.component';
import {SpecViewComComponent} from '../spec-view-com/spec-view-com.component';
import {SpecComponent} from '../spec/spec.component';
import {SpecLogTableComponent} from '../spec-log-table/spec-log-table.component';
import {SpecUploadFormComponent} from '../spec-upload-form/spec-upload-form.component';
import {EditSpecComponent} from '../dialog/edit-spec/edit-spec.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../site-management/material.module';
import {HttpClientModule} from '@angular/common/http';
import {GoogleChartsModule} from 'angular-google-charts';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    GoogleChartsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDLtEwgpx6fAWTMe2dq1mi0Z2YC7s2Xf7I',
      authDomain: 'spec-e9efb.firebaseapp.com',
     /* databaseURL: 'https://spec-e9efb.firebaseio.com',*/
      projectId: 'spec-e9efb',
      storageBucket: 'spec-e9efb.appspot.com',
      /*messagingSenderId: '425231395304',
      appId: '1:425231395304:web:499cac3e055a40198a1c5d',
      measurementId: 'G-Z470SD0MEL'*/
    }),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ]
})
export class SpecrouteModule { }
