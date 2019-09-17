import {Component, OnInit, ViewChild} from '@angular/core';
import {IOwned} from '../owned-towers/Owned';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnedService} from '../owned-towers/Owned.service';
import {count, map, startWith} from 'rxjs/operators';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {MatSnackBar} from '@angular/material';
import {SiteDetails} from '../../site-management/site-details';


@Component({
  selector: 'app-addusage',
  templateUrl: './addusage.component.html',
  styleUrls: ['./addusage.component.css']
})
export class AddusageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private os: OwnedService, private siteDetailsService: SiteDetailsService,
              private snackBar: MatSnackBar, private ownedservice: OwnedService) {
    this.ot = new IOwned();
    this.ownedservice.getOwnedTowers().subscribe(data => {
      this.sites1 = data;
      for (let counter = 0; counter < this.sites1.length; counter++) {
        this.SitesIn[counter] = this.sites1[counter].siteID;
      }
    });

    this.siteDetailsService.findAll().subscribe(data => {
      this.sites = data;
      for (let counter = 0; counter < this.sites.length; counter++) {
        if (!this.SitesIn.includes(this.sites[counter].siteID)) {
          this.options[counter] = this.sites[counter].siteID;
        }
      }
    });
  }

  ot: IOwned;
  SiteName: string;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];
  sites1: IOwned[];
  SitesIn: string[] = [];


  @ViewChild('f', {static: false}) addForm: NgForm;

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

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.validate()) {
      this.router.navigate(['/owned-towers']);
      // this.os.addOwnedTower(this.ot).subscribe(result => this.gotoOwnedTowers());
      this.addForm.reset();
      // this.matDialogReference.close([]);
    } else {
      this.openSnackBar('Invalid site ID or Detail already added');
    }
  }

  validate() {
    return (this.sites.some((el) => el.siteID === this.ot.siteID));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }


  gotoOwnedTowers() {
    this.router.navigate(['/owned-towers']);
  }

  getSiteName() {


  }

}
