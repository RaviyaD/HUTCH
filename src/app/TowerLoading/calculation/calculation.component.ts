import {Component, OnInit} from '@angular/core';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {SiteDetails} from '../../site-management/site-details';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {
  sites: SiteDetails[] = [];
  siteTowerHeight: string[] = [];
  options: string[] = [];


  constructor(private siteDetailsService: SiteDetailsService) {
    for (let counter = 0; counter < this.sites.length; counter++) {
      this.options[counter] = this.sites[counter].siteID;
      this.siteTowerHeight[counter] = this.sites[counter].siteName;
    }
  }

  ngOnInit() {
  }

}
