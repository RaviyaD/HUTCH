import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDetails} from '../site-details';
import {SiteDetailsService} from '../site-details.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-view-site-details',
  templateUrl: './view-site-details.component.html',
  styleUrls: ['./view-site-details.component.css'],
  providers: [DatePipe]
})
export class ViewSiteDetailsComponent implements OnInit {
  @ViewChild('f', {static: false}) siteForm: NgForm;
  sites: SiteDetails[];

  siteWithId: SiteDetails = { siteID: null, siteName: null, ownership: null, ownerSiteName: null, frequencyBand: null,
    commissionedDate: null, commissionedDate3G: null };

  routerParam: string;

  update: SiteDetails = { siteID: null, siteName: null, ownership: null, ownerSiteName: null, frequencyBand: null,
    commissionedDate: null, commissionedDate3G: null };

  // insert: SiteDetails = { siteID: null, siteName: null, ownership: null, ownerSiteName: null, frequencyBand: null,
  //  commissionedDate: null, commissionedDate3G: null };

  step = -1;

  onSubmit(buttonType) {
    if (buttonType === 'update') {
      this.update.siteID = this.routerParam;
      this.update.siteName = this.siteForm.value.name;
      this.update.ownership = this.siteForm.value.ownership;
      this.update.ownerSiteName = this.siteForm.value.osn;
      this.update.frequencyBand = this.siteForm.value.fb;
      this.update.commissionedDate = this.siteForm.value.cd;
      this.update.commissionedDate3G = this.siteForm.value.cd3G;
      /* console.log(this.siteForm.value.id);
      console.log(this.siteForm.value.name);
      console.log(this.siteForm.value.ownership);
      console.log(this.siteForm.value.osn);
      console.log(this.siteForm.value.fb);
      console.log(this.siteForm.value.cd);
      console.log(this.siteForm.value.cd3G);
      console.log(this.routerParam); */
      this.siteService.updateSite(this.routerParam, this.update).subscribe();
    } else if (buttonType === 'delete') {
      console.log('delete');
      console.log(this.routerParam);
      this.siteService.deleteSite(this.routerParam);
    }
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

  findSiteById(siteID: string) {
    this.siteService.getSiteByID(siteID).subscribe(data => {
      this.siteWithId = data;
      // console.log(this.siteWithId.commissionedDate);
      this.siteWithId.commissionedDate = this.datePipe.transform(this.siteWithId.commissionedDate, 'yyyy-MM-dd');
      this.siteWithId.commissionedDate3G = this.datePipe.transform(this.siteWithId.commissionedDate3G, 'yyyy-MM-dd');
      // console.log(this.siteWithId.commissionedDate);
      // console.log(this.siteWithId.siteID);
    });
  }
  constructor(private route: ActivatedRoute, private router: Router, private siteService: SiteDetailsService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.routerParam = this.route.snapshot.params.siteID;
    this.findSiteById(this.routerParam);
    /*this.siteService.findAll().subscribe(data => {
      this.sites = data;
    });*/
  }

}
