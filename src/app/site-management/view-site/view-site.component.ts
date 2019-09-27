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
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];
  siteID: string;

  constructor(private siteDetailsService: SiteDetailsService, private router: Router, private snackBar: MatSnackBar) {
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.options[counter] = this.sites[counter].siteID;
      }
    });
  }

  ngOnInit() {
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

  onSubmit() {
    if (this.validate()) {
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
    return (this.sites.some((el) =>  el.siteID === this.siteID ));
  }

  validateRedirect(value: string) {
    if (this.validate()) {
      this.router.navigate([value, this.siteID]);
    } else {
      this.openSnackBar('Invalid Site ID');
    }
  }
}
