import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SiteDetails} from '../site-details';
import {SiteDetailsService} from '../site-details.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-site-details',
  templateUrl: './add-site-details.component.html',
  styleUrls: ['./add-site-details.component.css']
})
export class AddSiteDetailsComponent implements OnInit {

  @ViewChild('f', {static: false}) siteForm: NgForm;
  sites: SiteDetails[] = [];
  insert: SiteDetails;
  step = -1;

  onSubmit() {
    if (this.validate(this.siteForm.value.id)) {
      this.openSnackBar('Invalid Site ID');
    } else {
      this.insert = new SiteDetails();
      this.insert.siteID = this.siteForm.value.id;
      this.insert.siteName = this.siteForm.value.name;
      this.insert.ownership = this.siteForm.value.ownership;
      this.insert.ownerSiteName = this.siteForm.value.osn;
      this.insert.frequencyBand = this.siteForm.value.fb;
      this.insert.commissionedDate = this.siteForm.value.cd;
      this.insert.commissionedDate3G = this.siteForm.value.cd3G;
      // Site Location Details
      console.log(Number(this.siteForm.value.latitude));
      this.insert.latitude = Number(this.siteForm.value.latitude);
      this.insert.longitude = Number(this.siteForm.value.longitude);
      this.insert.subRegion = this.siteForm.value.subRegion;
      this.insert.address = this.siteForm.value.address;
      this.insert.altitude = Number(this.siteForm.value.altitude);
      this.insert.towerType = this.siteForm.value.towerType;
      this.insert.towerHeight = Number(this.siteForm.value.towerHeight);
      this.insert.buildingHeight = Number(this.siteForm.value.buildingHeight);
      // Cellular Antenna Location Details
      this.insert.heightInTower = this.siteForm.value.heightInTower;
      this.insert.sector1Direction = Number(this.siteForm.value.sector1Direction);
      this.insert.sector2Direction = Number(this.siteForm.value.sector2Direction);
      this.insert.sector3Direction = Number(this.siteForm.value.sector3Direction);
      this.insert.sector1HBW = Number(this.siteForm.value.sector1HBW);
      this.insert.sector2HBW = Number(this.siteForm.value.sector2HBW);
      this.insert.sector3HBW = Number(this.siteForm.value.sector3HBW);
      this.insert.sector1Tilt2g = this.siteForm.value.sector1Tilt2g;
      this.insert.sector2Tilt2g = this.siteForm.value.sector2Tilt2g;
      this.insert.sector3Tilt2g = this.siteForm.value.sector3Tilt2g;
      this.insert.sector1Tilt3g = this.siteForm.value.sector1Tilt3g;
      this.insert.sector2Tilt3g = this.siteForm.value.sector2Tilt3g;
      this.insert.sector3Tilt3g = this.siteForm.value.sector3Tilt3g;
      // Cellular Antenna Type Details
      this.insert.bandType = this.siteForm.value.bandType;
      this.insert.antProdName3g = this.siteForm.value.antProdName3g;
      this.insert.antHBW3g = Number(this.siteForm.value.antHBW3g);
      this.insert.antModel3g = this.siteForm.value.antModel3g;
      this.insert.antQty3g = Number(this.siteForm.value.antQty3g);
      this.insert.bisectorAntSectorNo3G = this.siteForm.value.bisectorAntSectorNo3G;
      this.insert.antHBW2g = this.siteForm.value.antHBW2g;
      this.insert.antModel2g = this.siteForm.value.antModel2g;
      this.insert.antQty2g900 = Number(this.siteForm.value.antQty2g900);
      this.insert.antQty2g1800 = Number(this.siteForm.value.antQty2g1800);
      this.insert.totalAntQty = Number(this.siteForm.value.totalAntQty);
      // BSC RNC Details
      this.insert.bsc = this.siteForm.value.bsc;
      this.insert.rnc = Number(this.siteForm.value.rnc);
      this.insert.btsType = this.siteForm.value.btsType;
      this.insert.btsModel = this.siteForm.value.btsModel;
      this.insert.trxType2g = this.siteForm.value.trxType2g;
      // Cabin Details
      this.insert.equipmentType = this.siteForm.value.equipmentType;
      this.insert.shelterType = this.siteForm.value.shelterType;
      this.insert.shelterSize = this.siteForm.value.shelterSize;
      this.insert.accessoriesInShelter = this.siteForm.value.accessoriesInShelter;
      this.siteService.save(this.insert).subscribe();
      this.router.navigate(['Site/view-site-details' + '/' + this.siteForm.value.id]).then();
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

  constructor(private siteService: SiteDetailsService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.siteService.findAll().subscribe(data => {
      this.sites = data;
    });
  }

  validate(siteID: string) {
    return (this.sites.some((el) =>  el.siteID === siteID ));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

}
