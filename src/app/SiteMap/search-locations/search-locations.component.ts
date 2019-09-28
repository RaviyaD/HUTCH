import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {SiteDetails} from '../../site-management/site-details';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search-locations',
  templateUrl: './search-locations.component.html',
  styleUrls: ['./search-locations.component.css']
})
export class SearchLocationsComponent implements OnInit {


  lat = 7.8774;
  lng = 80.7003;
  mapType = 'roadmap';
  mmap: SiteDetails[];
  empty: SiteDetails[];
  routerParam: string;
  Smname: SiteDetails;
  lan: number;
  lon: number;
  lname: string;
  lid: string;

  constructor(private mapservice: SiteDetailsService, private  router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.routerParam = this.route.snapshot.params.siteName;

    this.getSiteDetailsByName(this.routerParam);


  }



  getSiteDetailsByName(name: string) {
    this.mapservice.getSiteDetailsByName(name).subscribe(data => {
      this.Smname = data;
      this.lan = data.latitude;
      this.lon = data.longitude;
      this.lname = data.siteName;
      this.lid = data.siteID;
      console.log(this.lan + 'venuuuuuuuuuuuuuuuuuuuuuuuu');
    });
  }
}
