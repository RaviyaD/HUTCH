import { Component, NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppComponent} from '../../app.component';
import {SiteDetails} from '../../site-management/site-details';
import {Security} from '../Security';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {Visitors} from '../Visitors';

@Component({
  selector: 'app-add-visitors',
  templateUrl: './add-visitors.component.html',
  styleUrls: ['./add-visitors.component.css']
})


@NgModule({
    declarations: [
      AppComponent,
      AddVisitorsComponent
    ],
  imports: [

    BrowserModule,
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
  ]

})


export class AddVisitorsComponent implements OnInit {

  optionssitename: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];
  vi: Visitors;

  constructor(private route: ActivatedRoute, private router: Router, private visitor: IncidentService, private siteDetailsService: SiteDetailsService) {

    this.vi = new Visitors();
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {

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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionssitename.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  gotoViewVisitor() {
   this.router.navigate(['Security/view-visitors']);
  }

  onSubmit() {

    this.visitor.addVisitors(this.vi).subscribe(result => this.gotoViewVisitor());
  }

  log(x) { console.log(x); }

}
