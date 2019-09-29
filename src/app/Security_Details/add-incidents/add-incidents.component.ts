import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {Incident} from '../Incident';
import {SiteDetails} from '../../site-management/site-details';

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
  @ViewChild('f', {static: false}) siteForm: NgForm;
  sites: Incident[] = [];
  insert: Incident; /*= {siteName: null, incidentDate: null,summeryOfTheIncident:null,dateOfInform:null,
    informerName=null,descriptionStolenProperty:null,provideAbansSecurity:null,dateOfEntry:null,
    nameOfThePoliceStation:null, ObtainPoliceReport:null,Remarks:null };*/
  step = 0;

  onSubmit(insert: string) {
    if (insert === 'insert') {
      this.insert.siteName = this.siteForm.value.sname;
      this.insert.incidentDate = this.siteForm.value.idate;
      this.insert.summeryOfTheIncident = this.siteForm.value.soi;
      this.insert.descriptionStolenProperty = this.siteForm.value.sp;
      this.insert.informerName = this.siteForm.value.iname;
      this.insert.dateOfInform = this.siteForm.value.indate;
      this.insert.provideAbansSecurity = this.siteForm.value.provideAbansSecurity;
      this.insert.dateOfEntry = this.siteForm.value.endate;
      this.insert.nameOfThePoliceStation = this.siteForm.value.ploicename;
      this.insert.obtainPoliceReport = this.siteForm.value.ObtainPoliceReport;
      this.insert.remarks = this.siteForm.value.remark;
      this.incidentservice.addincident(this.insert).subscribe();
      this.router.navigate(['Security/view-incidents']);
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



  constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private incidentservice: IncidentService) {
    this.insert = new Incident();
  }

  ngOnInit() {
  }
  OnSubmit() {

   // this.is.addincident(this.inn).subscribe(result => this.gotoViewIncident());
  }
  gotoViewIncident() {
    this.router.navigate(['/view-incidents']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

}


