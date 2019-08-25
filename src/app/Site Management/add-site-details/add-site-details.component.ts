import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SiteDetails} from '../site-details';
import {SiteDetailsService} from '../site-details.service';

@Component({
  selector: 'app-add-site-details',
  templateUrl: './add-site-details.component.html',
  styleUrls: ['./add-site-details.component.css']
})
export class AddSiteDetailsComponent implements OnInit {

  @ViewChild('f', {static: false}) siteForm: NgForm;
  sites: SiteDetails[];
  insert: SiteDetails = { siteID: null, siteName: null, ownership: null, ownerSiteName: null, frequencyBand: null,
    commissionedDate: null, commissionedDate3G: null };

  step = -1;

  onSubmit() {
    this.insert.siteID = this.siteForm.value.id;
    this.insert.siteName = this.siteForm.value.name;
    this.insert.ownership = this.siteForm.value.ownership;
    this.insert.ownerSiteName = this.siteForm.value.osn;
    this.insert.frequencyBand = this.siteForm.value.fb;
    this.insert.commissionedDate = this.siteForm.value.cd;
    this.insert.commissionedDate3G = this.siteForm.value.cd3G;
    this.siteService.save(this.insert).subscribe();
  }

  /*goToSiteList() {
    this.router.navigate(['/view-site']);
  }*/

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private siteService: SiteDetailsService) { }

  ngOnInit() {
  }

}
