import {Component, NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBar} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppComponent} from '../../app.component';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {SiteDetails} from '../../site-management/site-details';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css']
})
@NgModule({
  declarations: [
    AppComponent,
    AddMaintenanceComponent,
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

export class AddMaintenanceComponent implements OnInit {

  optionssiteid: string[] = [];
  optionssitename: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];
  expectedDate: any;
  datee: any;
  datePipe: DatePipe;
  currendate: any;
  im: IMaintenance;

  constructor(private route: ActivatedRoute, private router: Router, public datePipe: DatePipe, private ms: MaintenanceServicesService,
              private siteDetailsService: SiteDetailsService, private snackBar: MatSnackBar) {
    this.im = new IMaintenance();
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.optionssiteid[counter] = this.sites[counter].siteID;
        this.optionssitename[counter] = this.sites[counter].siteName;
      }

    });
    this.expectedDate = new Date(new Date().toLocaleDateString('en-US')).toISOString().substr(0, 10);
    datePipe.transform(this.expectedDate, 'yyyy-MM-dd');
    console.log(this.expectedDate);
  }


  error: any = {isError: false, errorMessage: ''};
  isValidDate: any;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  myControl = new FormControl();


  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  cat: string[] = ['Security Gate', 'Cabin', 'Dishes', 'Tower', 'Genarater', 'Other'];
  pio: string[] = ['High', 'Normal', 'Low'];

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
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

  public showsiteid(key: string) {
    for (let i = 0; i < this.optionssitename.length; i++) {
      if (key === this.optionssitename[i]) {
        return this.optionssiteid[i];
      }
    }
  }

  onSubmit() {


    this.im.idate = this.datePipe.transform(this.im.idate, 'yyyy-MM-dd');
    this.im.sid = this.showsiteid(this.im.sname);

    this.isValidDate = this.validateDates(this.im.idate, this.expectedDate);
    if (this.isValidDate) {
      this.im.status = 'Pending';
      this.ms.addMaintenance(this.im).subscribe(result => this.gotoViewMaintenance());
    } else {
      this.openSnackBar('Enter Valid Date');
    }
  }

  gotoViewMaintenance() {
    this.router.navigate(['/Maintenance/view-maintenance']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  validateDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate == null || eDate == null)) {
      this.error = {isError: true, errorMessage: 'Start date and end date are required.'};
      this.isValidDate = false;
    }

    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      this.error = {isError: true, errorMessage: 'End date should be grater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  log(x) {
    console.log(x);
  }
}
