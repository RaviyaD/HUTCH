import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SiteDetailsService} from '../site-details.service';
import {SiteDetails} from '../site-details';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
selector: 'app-view-site',
templateUrl: './view-site.component.html',
styleUrls: ['./view-site.component.css']
})

export class ViewSiteComponent implements OnInit {
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  nameOptions: string[] = [];
  filteredNameOptions: Observable<string[]>;
  sites: SiteDetails[];
  siteID: string;
  siteName: string;

  constructor(private siteDetailsService: SiteDetailsService, private router: Router, private snackBar: MatSnackBar) {
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.options[counter] = this.sites[counter].siteID;
        this.nameOptions[counter] = this.sites[counter].siteName;
      }
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredNameOptions = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(type: string) {
    if (this.validate()) {
      if (type === 'name') {
        for (const site of this.sites) {
          if (site.siteName === (this.siteName)) {
            this.siteID = site.siteID;
          }
        }
      }
      this.router.navigate(['Site/view-site-details', this.siteID]);
    } else {
      this.openSnackBar('Invalid Site ID');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  validate() {
    return (this.sites.some((el) =>  el.siteID === this.siteID ) || this.sites.some((el) =>  el.siteName === this.siteName ));
  }

  validateRedirect(value: string) {
    if (this.validate()) {
      for (const site of this.sites) {
        if (site.siteName === (this.siteName)) {
          this.siteID = site.siteID;
        }
      }
      if (value === '/siteMap/directmap') {
        this.router.navigate([value, this.siteName]);
      } else {
        this.router.navigate([value, this.siteID]);
      }
    } else {
      this.openSnackBar('Invalid Site ID or Name');
    }
  }
}
