import { Component, OnInit } from '@angular/core';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Direc} from './Direc';

@Component({
  selector: 'app-direction-map',
  templateUrl: './direction-map.component.html',
  styleUrls: ['./direction-map.component.css']
})
export class DirectionMapComponent implements OnInit {

  lat = 7.8774;
  lng = 80.7003;
  lan: number;
  lon: number;
  routerParam: string;

  constructor(public servicess: SiteDetailsService, private  router: Router, private route: ActivatedRoute) {
  }

  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  laka: Direc = new Direc();

  ngOnInit() {
    this.routerParam = this.route.snapshot.params.siteName;
    this.getDirection(this.routerParam);
  }

  getDirection(name: string) {
    this.origin = {lat: 6.58539, lng: 79.9607};


    this.servicess.getSiteDetailsByName(name).subscribe(data => {
      this.lan = data.latitude;
      this.lon = data.longitude;
    });


  }

}

