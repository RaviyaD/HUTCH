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
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  search: string;
  siteWithId: SiteDetails = new SiteDetails();
  routerParam: string;
  update: SiteDetails;
  step = -1;
  typeOptions: string[] = ['COW', 'GM', 'GP', 'RTP', 'RTT', 'SS'];
  bandOptions: string[] = ['Single', 'Dual', 'Dual/Single'];
  filteredOptionsTowerType: Observable<string[]>;
  modelOptions: string[] = ['Agisson', 'Andrew', 'Katherin'];
  btsOptions: string[] = ['Indoor', 'Outdoor', 'Indoor/Outdoor'];
  trxOptions: string[] = ['DTRUG', 'ETRMG', 'MRFU', 'RRU', 'RSU', 'TRMG'];
  filteredOptionsTRX: Observable<string[]>;

  onSubmit(buttonType) {
    if (buttonType === 'search') {
      if (this.validate(this.search)) {
        this.findSiteById(this.search);
        this.step = 0;
      } else {
        this.openSnackBar('Invalid Site ID');
      }
    } else {
      if (this.siteForm.value.siteid != null) {
        if (buttonType === 'update') {
          this.update = new SiteDetails();
          this.update.siteID = this.siteForm.value.siteid;
          this.update.siteName = this.siteForm.value.name;
          this.update.ownership = this.siteForm.value.ownership;
          this.update.ownerSiteName = this.siteForm.value.osn;
          this.update.frequencyBand = this.siteForm.value.fb;
          this.update.commissionedDate = this.siteForm.value.cd;
          this.update.commissionedDate3G = this.siteForm.value.cd3G;
          // Site Location Details
          this.update.latitude = Number(this.siteForm.value.latitude);
          this.update.longitude = Number(this.siteForm.value.longitude);
          this.update.subRegion = this.siteForm.value.subRegion;
          this.update.address = this.siteForm.value.address;
          this.update.altitude = Number(this.siteForm.value.altitude);
          this.update.towerType = this.siteWithId.towerType;
          this.update.towerHeight = Number(this.siteForm.value.towerHeight);
          this.update.buildingHeight = Number(this.siteForm.value.buildingHeight);
          // Cellular Antenna Location Details
          this.update.heightInTower = this.siteForm.value.heightInTower;
          this.update.sector1Direction = Number(this.siteForm.value.sector1Direction);
          this.update.sector2Direction = Number(this.siteForm.value.sector2Direction);
          this.update.sector3Direction = Number(this.siteForm.value.sector3Direction);
          this.update.sector1HBW = Number(this.siteForm.value.sector1HBW);
          this.update.sector2HBW = Number(this.siteForm.value.sector2HBW);
          this.update.sector3HBW = Number(this.siteForm.value.sector3HBW);
          this.update.sector1Tilt2g = this.siteForm.value.sector1Tilt2g;
          this.update.sector2Tilt2g = this.siteForm.value.sector2Tilt2g;
          this.update.sector3Tilt2g = this.siteForm.value.sector3Tilt2g;
          this.update.sector1Tilt3g = this.siteForm.value.sector1Tilt3g;
          this.update.sector2Tilt3g = this.siteForm.value.sector2Tilt3g;
          this.update.sector3Tilt3g = this.siteForm.value.sector3Tilt3g;
          // Cellular Antenna Type Details
          this.update.bandType = this.siteForm.value.bandType;
          this.update.antProdName3g = this.siteForm.value.antProdName3g;
          this.update.antHBW3g = Number(this.siteForm.value.antHBW3g);
          this.update.antModel3g = this.siteForm.value.antModel3g;
          this.update.antQty3g = Number(this.siteForm.value.antQty3g);
          this.update.bisectorAntSectorNo3G = this.siteForm.value.bisectorAntSectorNo3G;
          this.update.antHBW2g = this.siteForm.value.antHBW2g;
          this.update.antModel2g = this.siteForm.value.antModel2g;
          this.update.antQty2g900 = Number(this.siteForm.value.antQty2g900);
          this.update.antQty2g1800 = Number(this.siteForm.value.antQty2g1800);
          this.update.totalAntQty = Number(this.siteForm.value.totalAntQty);
          // BSC RNC Details
          this.update.bsc = this.siteForm.value.bsc;
          this.update.rnc = Number(this.siteForm.value.rnc);
          this.update.btsType = this.siteForm.value.btsType;
          this.update.btsModel = this.siteForm.value.btsModel;
          this.update.trxType2g = this.siteWithId.trxType2g;
          // Cabin Details
          this.update.equipmentType = this.siteForm.value.equipmentType;
          this.update.shelterType = this.siteForm.value.shelterType;
          this.update.shelterSize = this.siteForm.value.shelterSize;
          this.update.accessoriesInShelter = this.siteForm.value.accessoriesInShelter;
          this.siteService.updateSite(this.siteForm.value.siteid, this.update).subscribe();
          this.openSnackBar('Site updated');
          this.router.navigate(['Site/view-site-details' + '/' + this.siteForm.value.siteid]).then();
          this.step = 0;
        } else if (buttonType === 'delete') {
          this.siteService.deleteSite(this.siteForm.value.siteid);
          this.openSnackBar('Site deleted');
          this.router.navigate(['Site/view-all-sites']).then();
          this.step = 0;
        }
      } else {
        this.openSnackBar('No Site ID chosen!!');
      }
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
    this.filteredOptionsTowerType = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      );
    this.filteredOptionsTRX = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.typeOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.trxOptions.filter(option => option.toLowerCase().includes(filterValue));
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
