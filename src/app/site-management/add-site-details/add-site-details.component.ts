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
  insert: SiteDetails = { siteID: null, siteName: null, ownership: null, ownerSiteName: null, frequencyBand: null,
    commissionedDate: null, commissionedDate3G: null };
  step = -1;

  onSubmit() {
    if (this.validate(this.siteForm.value.id)) {
      this.openSnackBar('Invalid Site ID');
    } else {
      this.insert.siteID = this.siteForm.value.id;
      this.insert.siteName = this.siteForm.value.name;
      this.insert.ownership = this.siteForm.value.ownership;
      this.insert.ownerSiteName = this.siteForm.value.osn;
      this.insert.frequencyBand = this.siteForm.value.fb;
      this.insert.commissionedDate = this.siteForm.value.cd;
      this.insert.commissionedDate3G = this.siteForm.value.cd3G;
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
