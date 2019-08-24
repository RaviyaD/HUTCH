import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDetails} from '../site-details';
import {SiteDetailsService} from '../site-details.service';

@Component({
  selector: 'app-view-site-details',
  templateUrl: './view-site-details.component.html',
  styleUrls: ['./view-site-details.component.css']
})
export class ViewSiteDetailsComponent implements OnInit {
  @ViewChild('f', {static: false}) siteForm: NgForm;
  sites: SiteDetails[];

  siteWithId: SiteDetails;

  insert: SiteDetails = { siteID: null, siteName: null, ownership: null, ownerSiteName: null, frequencyBand: null,
    commissionedDate: null, commissionedDate3G: null };

  step = 0;

  temp = 'nimesh';

  /*onSubmit() {
    this.temp = this.siteForm.value.id;
    this.insert = this.siteForm.value.id;
    this.insert.name = this.siteForm.value.name;
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

  findSiteById() {
    this.siteService.getSiteByID('200').subscribe(data => {
      this.siteWithId = data;
    });
  }
  constructor(private route: ActivatedRoute, private router: Router, private siteService: SiteDetailsService) { }

  ngOnInit() {
    this.siteService.findAll().subscribe(data => {
      this.sites = data;
    });
  }

}
