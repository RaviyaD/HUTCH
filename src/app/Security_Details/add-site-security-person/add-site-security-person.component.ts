import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectServicesService} from '../../OngoingProject/view-ongoing-project/ProjectServices';
import {IncidentService} from '../IncidentService';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Security} from '../Security';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {SiteDetails} from '../../site-management/site-details';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {Incident} from '../Incident';

@Component({
  selector: 'app-add-site-security-person',
  templateUrl: './add-site-security-person.component.html',
  styleUrls: ['./add-site-security-person.component.css']
})

@NgModule({

  declarations: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule
  ]

})
export class AddSiteSecurityPersonComponent implements OnInit {
  optionssiteid: string[] = [];
  optionssitename: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];
  se: Security;

  constructor(private route: ActivatedRoute, private router: Router, private security: IncidentService, private siteDetailsService: SiteDetailsService) {

    this.se = new Security();
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.optionssiteid[counter] = this.sites[counter].siteID;
        this.optionssitename[counter] = this.sites[counter].siteName;

      }


    });
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  myControl = new FormControl();


  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);


  public validcomplete(key: string) {
    let j;
    for (let i = 0; i < this.optionssitename.length; i++) {

      if (key !== this.optionssitename[i]) {
        j = 0;
      } else {
        j = -1;
        break;
      }
    }
    return j;
  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  gotoViewSecurity() {
    this.router.navigate(['Security/view-site-security-person']);
  }

  public  showsiteid(key: string) {
    for (let i = 0; i < this.optionssitename.length; i++) {
      if (key === this.optionssitename[i]) {
        return this.optionssiteid[i];
      }
    }
  }
  onSubmit() {
    console.log(this.se.siteName);
    console.log(this.se.phoneNumber);
    console.log(this.se.securityName);
    console.log(this.se.workTime);
    this.security.addSecurity(this.se).subscribe(result => this.gotoViewSecurity());
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionssitename.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  log(x) { console.log(x); }


}
