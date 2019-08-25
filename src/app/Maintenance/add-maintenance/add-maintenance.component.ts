import {Component, NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA, Inject} from '@angular/core';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppComponent} from '../../app.component';
import { MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import { MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDetailsService} from '../../Site Management/site-details.service';
import {SiteDetails} from '../../Site Management/site-details';

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

  options: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];

  im: IMaintenance;

  constructor(private route: ActivatedRoute, private router: Router, private ms: MaintenanceServicesService,
              private siteDetailsService: SiteDetailsService) {
    this.im = new IMaintenance();
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.options[counter] = this.sites[counter].siteName;
        console.log(this.options[counter]);
      }
      console.log(this.options[3]);
    });
  }




  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  myControl = new FormControl();
 // options: string[] = ['One', 'Two', 'Three'];
 // filteredOptions: Observable<string[]>;

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  cat: string[] = ['Secutiry', 'Technical'];
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

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    this.im.status = 'pending';
    this.ms.addMaintenance(this.im).subscribe(result => this.gotoViewMaintenance());
  }

  gotoViewMaintenance() {
    this.router.navigate(['/view-maintenance']);
  }

  log(x) { console.log(x); }
}
