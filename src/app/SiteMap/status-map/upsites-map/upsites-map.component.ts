import { Component, OnInit } from '@angular/core';
import {IMaintenance} from '../../../Maintenance/Maintenance';
import {SiteDetails} from '../../../site-management/site-details';
import {MaintenanceServicesService} from '../../../Maintenance/view-maintenance/MaintenanceServices';
import {SiteDetailsService} from '../../../site-management/site-details.service';

@Component({
  selector: 'app-upsites-map',
  templateUrl: './upsites-map.component.html',
  styleUrls: ['./upsites-map.component.css']
})
export class UpsitesMapComponent implements OnInit {


  latU = 7.8774;
  lngU = 80.7003;
  mlistU: IMaintenance[];
  mlist2U: IMaintenance[];
  mlist3U: IMaintenance[];

  upsites: SiteDetails[] = [];
  optionsU: string[] = [];
  options2U: string[] = [];

  namee: string;
  mU = 0;
  m2U = 0;

  tempU: string;
  mapU: SiteDetails[] = [];

  constructor(private maintenanceservice: MaintenanceServicesService, private mapservice: SiteDetailsService) {
    this.maintenanceservice.getMaintenance().subscribe(data => {
        this.mlistU = data;

        for (let counter = 0; counter < this.mlistU.length; counter++) {
          if (this.mlistU[counter].status !== 'Complete' && this.mlistU[counter].piority === 'Normal') {
            this.optionsU[counter] = this.mlistU[counter].sname;
            this.getUpsites(this.mlistU[counter].sname);
          }
        }
      }
    );
  }

  ngOnInit() {

  }
  getUpsites(name2: string) {
    this.mapservice.getSiteDetailsByName(name2).subscribe(data2 => {
      this.upsites[this.m2U] = data2;
      console.log(this.upsites[this.m2U].siteName + '====================get method===============');
      this.m2U = this.m2U + 1;
      this.namee = data2.siteName;
    });
  }

}
