import { Component, OnInit } from '@angular/core';
import {IMaintenance} from '../../../Maintenance/Maintenance';
import {SiteDetails} from '../../../site-management/site-details';
import {MaintenanceServicesService} from '../../../Maintenance/view-maintenance/MaintenanceServices';
import {SiteDetailsService} from '../../../site-management/site-details.service';

@Component({
  selector: 'app-maintainsites-map',
  templateUrl: './maintainsites-map.component.html',
  styleUrls: ['./maintainsites-map.component.css']
})
export class MaintainsitesMapComponent implements OnInit {


  latM = 7.8774;
  lngM = 80.7003;
  mlistM: IMaintenance[];
  mlist2M: IMaintenance[];
  mlist3M: IMaintenance[];

  maintainingsites: SiteDetails[] = [];
  optionsM: string[] = [];
  options2M: string[] = [];

  mM = 0;
  m2M = 0;
  mapM: SiteDetails[] = [];

  constructor(private maintenanceserviceM: MaintenanceServicesService, private mapserviceM: SiteDetailsService) {
    this.maintenanceserviceM.getMaintenance().subscribe(data => {
        this.mlistM = data;

        for (let counter = 0; counter < this.mlistM.length; counter++) {
          if (this.mlistM[counter].status !== 'Complete' && this.mlistM[counter].piority === 'Low') {
            this.optionsM[counter] = this.mlistM[counter].sname;
            this.getMaintaining(this.mlistM[counter].sname);
          }
        }
      }
    );
  }

  ngOnInit() {

  }
  getMaintaining(nameM: string) {
    this.mapserviceM.getSiteDetailsByName(nameM).subscribe(dataM => {
      this.maintainingsites[this.m2M] = dataM;
      this.m2M = this.m2M + 1;
    });
  }




}
