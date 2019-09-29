import { Component, OnInit } from '@angular/core';
import {IMaintenance} from '../../Maintenance/Maintenance';
import {SiteDetails} from '../../site-management/site-details';
import {MaintenanceServicesService} from '../../Maintenance/view-maintenance/MaintenanceServices';
import {SiteDetailsService} from '../../site-management/site-details.service';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css']
})
export class StatusReportComponent implements OnInit {

  mlist: IMaintenance[];
  mlist2: IMaintenance[];
  mlist3: IMaintenance[];

  upsites: SiteDetails[] = [];
  downsites: SiteDetails[] = [];
  underMaintenance: SiteDetails[];

  options: string[] = [];
  options2: string[] = [];
  cc: number;

  m = 0;
  m2 = 0;

  temp: string;
  map: SiteDetails[] = [];

  constructor(private maintenanceservice: MaintenanceServicesService, private mapservice: SiteDetailsService) {
    this.maintenanceservice.getMaintenance().subscribe(data => {
        this.mlist = data;

        for (let counter = 0; counter < this.mlist.length; counter++) {
          if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'High') {
            this.options[counter] = this.mlist[counter].sname;
            this.get(this.mlist[counter].sname);
            this.cc = counter;
            console.log(this.cc + 'kkkkkkkkkkkkkkk');
          }
          if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'Normal') {
            this.options[counter] = this.mlist[counter].sname;
            this.get2(this.mlist[counter].sname);
            console.log(this.cc + 'active');
          }
        }
      }
    );
  }

  ngOnInit() {}

  get(name: string) {
    this.mapservice.getSiteDetailsByName(name).subscribe(data1 => {
      this.downsites[this.m] = data1;
      this.m = this.m + 1;
    });
  }

  get2(name2: string) {
    this.mapservice.getSiteDetailsByName(name2).subscribe(data2 => {
      this.upsites[this.m2] = data2;
      this.m2 = this.m2 + 1;
    });
  }
}
