import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITower} from '../physical-measurement/Tower';
import {TowerService} from '../physical-measurement/Tower.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {count, map, startWith} from 'rxjs/operators';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {OwnedService} from '../owned-towers/Owned.service';
import {IOwned} from '../owned-towers/Owned';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {SiteDetails} from '../../site-management/site-details';

@Component({
  selector: 'app-add-antenna',
  templateUrl: './add-antenna.component.html',
  styleUrls: ['./add-antenna.component.css']
})
export class AddAntennaComponent implements OnInit {
  at: ITower;
  myControl = new FormControl();
  options: string[] = [];
  sitenames: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: IOwned[] = [];
  name: string = null;
  Height: boolean;
  public counter;
  operators: string[] = ['Hutch', 'Etisalat', 'Mobitel', 'SLT', 'LANKA BELL'];
  Type: string[] = ['GSM', 'MICRO'];
  sites1: SiteDetails[];
  sites1ID: string[];


  constructor(private route: ActivatedRoute, private router: Router,
              private ts: TowerService, private snackBar: MatSnackBar,
              private Service: OwnedService, private Dialogref: MatDialogRef<AddAntennaComponent>) {
    this.at = new ITower();


    this.Service.getOwnedTowers().subscribe(data => {
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
    this.router.navigate(['/physical-measurement']);


  }

  // auto complete part
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (!this.validateHeight()) {
      this.openSnackBar('Invalid site ID');
    }

    if (this.validate() && this.validateHeight()) {
      this.ts.addTower(this.at).subscribe(result => this.gotoAnTowers());
      console.log(this.at.area);
    } else {
      this.openSnackBar('Form is Invalid!');
    }
    // this.GenerateEmail();
  }

  validate() {
    return (this.sites.some((el) => el.siteID === this.at.siteID));
  }

  ValidateAll() {
    return !(this.validateArea() && this.validateAzimuth() && this.validateDiameter() && this.validateHeight());
  }

  validateHeight() {
    return (this.at.height >= 5 && this.at.height <= 15);
  }

  validateDiameter() {
    return (this.at.diameter >= 0.5 && this.at.diameter <= 5);
  }

  validateArea() {
    return (this.at.area >= 2 && this.at.area <= 15);

  }

  validateAzimuth() {
    return (this.at.azimuth >= 0 && this.at.azimuth <= 360);
  }

  gotoAnTowers() {
    this.Dialogref.close();
    this.ngOnInit();
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
      if (this.at.siteID === this.options[this.counter]) {
        return this.sitenames[this.counter];
      }
    }

  }
}



