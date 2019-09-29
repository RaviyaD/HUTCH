import { Component, OnInit } from '@angular/core';
import {IMaintenance} from '../../Maintenance/Maintenance';
import {SiteDetails} from '../../site-management/site-details';
import {MaintenanceServicesService} from '../../Maintenance/view-maintenance/MaintenanceServices';
import {SiteDetailsService} from '../../site-management/site-details.service';

@Component({
  selector: 'app-status-map',
  templateUrl: './status-map.component.html',
  styleUrls: ['./status-map.component.css']
})
export class StatusMapComponent implements OnInit {

  lat = 7.8774;
  lng = 80.7003;
  mlist: IMaintenance[];
  mlist2: IMaintenance[];
  mlist3: IMaintenance[];

  upsites: SiteDetails[] = [];
  downsites: SiteDetails[] = [];
  underMaintenance: SiteDetails[] = [];

  options: string[] = [];
  options2: string[] = [];

  m = 0;
  m2 = 0;
  m3 = 0;

  temp: string;
  map: SiteDetails[] = [];

  constructor(private maintenanceservice: MaintenanceServicesService, private mapservice: SiteDetailsService) {
    this.maintenanceservice.getMaintenance().subscribe(data => {
        this.mlist = data;

        for (let counter = 0; counter < this.mlist.length; counter++) {
          if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'High') {
            this.options[counter] = this.mlist[counter].sname;
            this.get(this.mlist[counter].sname);
          }
          if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'Normal') {
            this.options[counter] = this.mlist[counter].sname;
            this.get2(this.mlist[counter].sname);
          }
          if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'Low') {
            this.options[counter] = this.mlist[counter].sname;
            this.get3(this.mlist[counter].sname);
          }
        }
      }
    );
  }

  ngOnInit() {
    // this.print();
  }

  /* print() {
     for (let i = 0; i < this.options.length; i++) {
       console.log(this.options[i] + '================');
       this.mapservice.getMapByName(this.options[i]).subscribe(data1 => {
         if (data1 != null) {
           this.downsites[i] = data1;
           console.log(this.downsites[i].lang + 'kkkkkkkkkkkkkkk');
         }
       });
     }
   } */

  get(name: string) {
    this.mapservice.getSiteDetailsByName(name).subscribe(data1 => {
      this.downsites[this.m] = data1;
      console.log(this.downsites[this.m].siteName + '====================get method===============');
      this.m = this.m + 1;
    });
  }

  get2(name2: string) {
    this.mapservice.getSiteDetailsByName(name2).subscribe(data2 => {
      this.upsites[this.m2] = data2;
      console.log(this.upsites[this.m2].siteName + '====================get method===============');
      this.m2 = this.m2 + 1;
    });
  }

  get3(name3: string) {
    this.mapservice.getSiteDetailsByName(name3).subscribe(data3 => {
      this.underMaintenance[this.m3] = data3;
      console.log(this.underMaintenance[this.m3].siteName + '====================get method===============');
      this.m3 = this.m3 + 1;
    });
  }
}
