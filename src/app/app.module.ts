import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddMaintenanceComponent } from './Maintenance/add-maintenance/add-maintenance.component';
import {MatAutocompleteModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpecNavComponent } from './Specification/spec-nav/spec-nav.component';
import { SpecComponent } from './Specification/spec/spec.component';
import { SpecLogTableComponent } from './Specification/spec-log-table/spec-log-table.component';
import { SpecViewComComponent } from './Specification/spec-view-com/spec-view-com.component';
import { ViewMaintenanceComponent } from './Maintenance/view-maintenance/view-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AddMaintenanceComponent,
    SpecNavComponent,
    SpecComponent,
    SpecLogTableComponent,
    SpecViewComComponent,
    ViewMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
