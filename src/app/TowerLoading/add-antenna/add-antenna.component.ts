import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITower} from '../physical-measurement/Tower';
import {TowerService} from '../physical-measurement/Tower.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {SiteDetails} from '../../site-management/site-details';
import {SiteDetailsService} from '../../site-management/site-details.service';

@Component({
  selector: 'app-add-antenna',
  templateUrl: './add-antenna.component.html',
  styleUrls: ['./add-antenna.component.css']
})
export class AddAntennaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
              private ts: TowerService, private snackBar: MatSnackBar,
              private siteDetailsService: SiteDetailsService) {
    this.at = new ITower();
    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        this.options[counter] = this.sites[counter].siteID;
      }
    });
  }

  at: ITower;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[] = [];
  name: string = null;
  Height: boolean;
  Diameter: boolean;
  Azimuth: boolean;
  public counter;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  // auto complete part
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue));
  }

  onSubmit() {

    // this.ts.addTower(this.at).subscribe(result => this.gotoOwnedTowers());
    if (this.validate()) {
      // this.router.navigate(['/owned-towers']);
      this.ts.addTower(this.at).subscribe(result => this.gotoAnTowers());
    } else {
      this.openSnackBar('Invalid site ID or Detail already added');
    }
    this.GenerateEmail();
  }

  validate() {
    return (this.sites.some((el) => el.siteID === this.at.siteID));
  }

  validateHeight() {

  }

  gotoAnTowers() {
    this.router.navigate(['/add-antenna']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  GenerateEmail() {
    console.log('Email');

  }

  getSiteName() {
    this.counter = 0;
    for (const each of this.sites) {
      this.counter++;
      if (this.at.siteID === this.sites[this.counter].siteID) {
        return this.sites[this.counter].siteName;
      }
    }

  }
}



