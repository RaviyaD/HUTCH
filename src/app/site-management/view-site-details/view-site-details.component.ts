import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDetails} from '../site-details';
import {SiteDetailsService} from '../site-details.service';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-view-site-details',
  templateUrl: './view-site-details.component.html',
  styleUrls: ['./view-site-details.component.css'],
  providers: [DatePipe]
})
export class ViewSiteDetailsComponent implements OnInit {
  @ViewChild('f', {static: false}) siteForm: NgForm;
  sites: SiteDetails[];
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  search: string;
  siteWithId: SiteDetails = new SiteDetails();
  routerParam: string;
  update: SiteDetails;
  step = -1;

  onSubmit(buttonType) {
    if (this.validate(this.siteForm.value.siteid)) {
      if (buttonType === 'update') {
        this.update = new SiteDetails();
        this.update.siteID = this.siteForm.value.siteid;
        this.update.siteName = this.siteForm.value.name;
        this.update.ownership = this.siteForm.value.ownership;
        this.update.ownerSiteName = this.siteForm.value.osn;
        this.update.frequencyBand = this.siteForm.value.fb;
        this.update.commissionedDate = this.siteForm.value.cd;
        this.update.commissionedDate3G = this.siteForm.value.cd3G;
        this.siteService.updateSite(this.siteForm.value.siteid, this.update).subscribe();
        this.openSnackBar('Site updated');
        setTimeout(() => {
          this.router.navigate(['Site/view-site-details' + '/' + this.siteForm.value.siteid]).then();
        }, 2500);
        this.step = 0;
      } else if (buttonType === 'delete') {
        this.siteService.deleteSite(this.siteForm.value.siteid);
        this.openSnackBar('Site deleted');
        setTimeout(() => {
          this.router.navigate(['Site/view-all-sites']).then();
        }, 2500);
        this.step = 0;
      }
    } else if (buttonType === 'search') {
      if (this.validate(this.search)) {
        this.findSiteById(this.search);
        this.step = 0;
      } else {
        this.openSnackBar('Invalid Site ID');
      }
    } else {
      this.openSnackBar('No Site selected');
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

  findSiteById(siteID: string) {
    this.siteService.getSiteByID(siteID).subscribe(data => {
      this.siteWithId = new SiteDetails();
      this.siteWithId = data;
      this.siteWithId.commissionedDate = this.datePipe.transform(this.siteWithId.commissionedDate, 'yyyy-MM-dd');
      this.siteWithId.commissionedDate3G = this.datePipe.transform(this.siteWithId.commissionedDate3G, 'yyyy-MM-dd');
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private siteService: SiteDetailsService,
              private datePipe: DatePipe,  private snackBar: MatSnackBar) {
    this.siteService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.options[counter] = this.sites[counter].siteID;
      }
    });
  }

  ngOnInit() {
    this.routerParam = this.search = this.route.snapshot.params.siteID;
    if (this.routerParam != null) {
      this.findSiteById(this.routerParam);
      this.step = 0;
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  validate(siteID: string) {
    return (this.sites.some((el) =>  el.siteID === siteID ));
  }
}
