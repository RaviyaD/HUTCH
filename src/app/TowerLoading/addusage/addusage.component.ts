import {Component, OnInit, ViewChild} from '@angular/core';
import {IOwned} from '../owned-towers/Owned';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnedService} from '../owned-towers/Owned.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl, NgForm} from '@angular/forms';
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

  ot: IOwned;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[] = [];
  sites1: IOwned[];
  SitesIn: string[] = [];
  name: string = null;
  @ViewChild('f', {static: false}) addForm: NgForm;
  private counter: number;

  constructor(private route: ActivatedRoute, private router: Router,
              private os: OwnedService,
              private siteDetailsService: SiteDetailsService,
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
    if (this.validate()) {
      this.router.navigate(['/owned-towers']);
      console.log(this.addForm);
      // this.os.addOwnedTower(this.ot).subscribe(result => this.gotoOwnedTowers());
      this.addForm.reset();
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

  getSiteName() {
    this.counter = 0;
    for (const each of this.sites) {
      this.counter++;
      if (this.ot.siteID === this.sites[this.counter].siteID) {
        return this.sites[this.counter].siteName;
      }
    }

  }

}
