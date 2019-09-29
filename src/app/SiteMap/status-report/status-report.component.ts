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
  c1: number;
  c2: number;
  c3: number;
  count1: number;
  count2: number;
  count3: number;
  m = 0;
  m2 = 0;

  temp: string;
  map: SiteDetails[] = [];

  constructor(private maintenanceservice: MaintenanceServicesService, private mapservice: SiteDetailsService) {
    this.c1 = 0;
    this.c2 = 0;
    this.c3 = 0;
    this.maintenanceservice.getMaintenance().subscribe(data => {
        this.mlist = data;

        for (let counter = 0; counter < this.mlist.length; counter++) {
          if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'High') {
            this.options[counter] = this.mlist[counter].sname;
            this.get(this.mlist[counter].sname);
            this.c1 = this.c1 + 1;
            console.log(this.c1 + '111');
          } else if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'Normal') {
            this.options[counter] = this.mlist[counter].sname;
            this.get2(this.mlist[counter].sname);
            this.c2 = this.c2 + 1;
            console.log(this.c2 + '222');
          } else if (this.mlist[counter].status !== 'Complete' && this.mlist[counter].piority === 'Low') {
            this.options[counter] = this.mlist[counter].sname;
            this.get2(this.mlist[counter].sname);
            this.c3 = this.c3 + 1;
            console.log(this.c3 + '333');
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
