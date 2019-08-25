import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {Incident} from '../Incident';
import {exitCodeFromResult} from '@angular/compiler-cli';

@Component({
  selector: 'app-add-incidents',
  templateUrl: './add-incidents.component.html',
  styleUrls: ['./add-incidents.component.css']
})


@NgModule({

  declarations: [
    AppComponent,
    AddIncidentsComponent
  ],

  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AddIncidentsComponent implements OnInit {
  inn: Incident;
  constructor(private route: ActivatedRoute, private router: Router, private is: IncidentService) {
    this.inn = new Incident();
  }


  ngOnInit() {
  }
  OnSubmit() {

    this.is.addincident(this.inn).subscribe(result => this.gotoViewIncident());
  }

  gotoViewIncident() {
    this.router.navigate(['/view-incident']);
  }

}
