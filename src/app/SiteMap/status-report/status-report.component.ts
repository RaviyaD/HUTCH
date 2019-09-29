import { Component, OnInit } from '@angular/core';
import {IMaintenance} from '../../Maintenance/Maintenance';
import {SiteDetails} from '../../site-management/site-details';
import {MaintenanceServicesService} from '../../Maintenance/view-maintenance/MaintenanceServices';
import {SiteDetailsService} from '../../site-management/site-details.service';
import * as jsPDF from 'jspdf';
import {DatePipe} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StatusReportComponent implements OnInit {

  mlist: IMaintenance[];
  mlist2: IMaintenance[];
  mlist3: IMaintenance[];
  public mapreports = [];
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



  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['Currently Total Up Sites', 'Currently Total Down Sites', 'Currently Total Maintaining Sites']; // initialization for headers
    const title = 'Report of Site Map Details'; // title of report
    for (let i = 0; i < this.mapreports.length; i++) {
      row.push(this.mapreports[i].count);
      rowD.push(row);
      row = [];
    }

  }

  getreporttoeach(count11 , count22 , count33) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Stautus Map Report', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis//
    pdf.setLineWidth(1.5);


    pdf.text('Currently Total Up Sites             :' + count11, 140, 190).setFontSize(12);
    pdf.text('Currently Total Down Sites           :' + count22, 140, 210).setFontSize(12);
    pdf.text('Currently Total Maintaining Sites    :' + count33, 140, 230).setFontSize(12);
    pdf.line(5, 150, 995, 150);
    const pageContent = function (data) {
      // HEADER

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof pdf.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      pdf.setFontSize(10);
      const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
      pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
    };


    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save('status Report' + '.pdf');

  }



}
