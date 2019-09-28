import { Component, OnInit } from '@angular/core';
import {SiteDetails} from '../../site-management/site-details';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat = 7.8774;
  lng = 80.7003;
  mmap: SiteDetails[];
  empty: SiteDetails[];
  routerParam: string ;
  Smname: SiteDetails;
  lan: number;
  lon: number;
  locname: string;

  constructor(private mapservice: SiteDetailsService , private  router: Router , private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.routerParam = this.route.snapshot.params.siteName;

    if ( this.routerParam != null) {
      // this.mmap = this.empty;
      this.mmap = this.empty;
      this.getSiteDetailsByName(this.routerParam);

    } else {

      this.mapservice.findAll().subscribe(data => {
        this.mmap = data;

      });
    }
  }

  getSiteDetailsByName(name: string) {
    this.mapservice.getSiteDetailsByName(name).subscribe(data => {
      this.lan = data.latitude;
      this.lon = data.longitude;
      this.locname = data.siteName;
    }); }
}

