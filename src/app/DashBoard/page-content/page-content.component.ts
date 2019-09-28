import {Component, OnInit} from '@angular/core';
import {MaintenanceServicesService} from '../../Maintenance/view-maintenance/MaintenanceServices';
import {IMaintenance} from '../../Maintenance/Maintenance';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {
  inprocessing: number;
  low: number;
  high: number;
  normal: number;
  mnt: IMaintenance[];

  constructor(public maintenancservice: MaintenanceServicesService) {
    this.inprocessing = 0;
    this.low = 0;
    this.high = 0;
    this.normal = 0;

  }

  public chartType = 'line';
  public chartDatasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'}
  ];
  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };


  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnInit() {
    this.getcountmaintenance();
  }

  getcountmaintenance() {
    this.maintenancservice.getMaintenance().subscribe(data => {
      this.mnt = data;
      for (let i = 0; i < this.mnt.length; i++) {
        if (this.mnt[i].status === 'In-Progressing') {
          this.inprocessing = this.inprocessing + 1;
        } else if (this.mnt[i].status === 'Pending' && this.mnt[i].piority === 'High') {
          this.high = this.high + 1;
        } else if (this.mnt[i].status === 'Pending' && this.mnt[i].piority === 'Normal') {
          this.normal = this.normal + 1;
        } else if (this.mnt[i].status === 'Pending' && this.mnt[i].piority === 'Low') {
          this.low = this.low + 1;
        }
      }
    });
  }
}
