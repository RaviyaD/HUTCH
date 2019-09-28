import { Component, OnInit } from '@angular/core';
import {IMaintenance} from '../../../Maintenance/Maintenance';
import {SiteDetails} from '../../../site-management/site-details';
import {MaintenanceServicesService} from '../../../Maintenance/view-maintenance/MaintenanceServices';
import {SiteDetailsService} from '../../../site-management/site-details.service';

@Component({
  selector: 'app-downsites-map',
  templateUrl: './downsites-map.component.html',
  styleUrls: ['./downsites-map.component.css']
})
export class DownsitesMapComponent implements OnInit {


  latD = 7.8774;
  lngD = 80.7003;
  mlistD: IMaintenance[];
  mlist2D: IMaintenance[];
  mlist3D: IMaintenance[];

  downsites: SiteDetails[] = [];
  optionsD: string[] = [];
  options2D: string[] = [];

  mD = 0;
  m2D = 0;
  mapD: SiteDetails[] = [];

  constructor(private maintenanceserviceD: MaintenanceServicesService, private mapserviceD: SiteDetailsService) {
    this.maintenanceserviceD.getMaintenance().subscribe(data => {
        this.mlistD = data;

        for (let counter = 0; counter < this.mlistD.length; counter++) {
          if (this.mlistD[counter].status !== 'Complete' && this.mlistD[counter].piority === 'High') {
            this.optionsD[counter] = this.mlistD[counter].sname;
            this.getDownsites(this.mlistD[counter].sname);
          }
        }
      }
    );
  }

  ngOnInit() {

  }
  getDownsites(name2: string) {
    this.mapserviceD.getSiteDetailsByName(name2).subscribe(data2 => {
      this.downsites[this.m2D] = data2;
      this.m2D = this.m2D + 1;
    });
  }




}

