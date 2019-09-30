import {Component, OnInit} from '@angular/core';
import {TowerDataSource} from '../physical-measurement/TowerDataSource';
import {TowerService} from '../physical-measurement/Tower.service';
import {MatDialog} from '@angular/material';
import {Isort} from '../physical-measurement/sort';
import {ITower} from '../physical-measurement/Tower';
import {OwnedService} from '../owned-towers/Owned.service';
import {IOwned} from '../owned-towers/Owned';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  public Tower1 = [];
  public Owned: IOwned = null;
  public errorMsg;
  dataSource: TowerDataSource;
  public ID: string;
  displayedColumns = ['siteID', 'height', 'diameter', 'azimuth', 'area', 'TypeAntenna', 'ownership', 'oppositeSite', 'date'];
  id: string;
  public sort: Isort[] = [];
  exampleDatabase: TowerService | null;

  constructor(private TS: TowerService, public dialog: MatDialog, private OS: OwnedService) {

  }

  ngOnInit() {
    this.dataSource = new TowerDataSource(this.TS);
    this.dataSource.loadTower();
    this.TS.listbyID('COL001')
      .subscribe(data1 => this.Tower1 = data1);
    this.TS.sort('COL001').subscribe(data => this.sort = data);
    this.ID = this.Tower1[1].siteID;
    this.OS.getTowerbyID('COL001').subscribe(data3 => this.Owned = data3);


  }

  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['siteID', 'height', 'diameter', 'azimuth', 'area', 'TypeAntenna', 'ownership', 'oppositeSite', 'date']; // initialization for headers
    const title = 'Sample Report'; // title of report
    for (let a = 0; a < this.Tower1.length; a++) {
      row.push(this.Tower1[a].siteID);
      row.push(this.Tower1[a].height);
      row.push(this.Tower1[a].diameter);
      row.push(this.Tower1[a].azimuth);
      row.push(this.Tower1[a].area);
      row.push(this.Tower1[a].type);
      row.push(this.Tower1[a].owner);
      row.push(this.Tower1[a].oppositeSite);
      row.push(this.Tower1[a].date);
      rowD.push(row);
      row = [];
    }
    this.getReport(col, rowD, title);
  }

  getReport(col: any[], rowD: any[], title: any) {
    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Tower Loading', 450, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Physical measurement:' + this.Tower1[0].siteID, 435, 130).setFontSize(20);  ////
    pdf.setLineWidth(1.5);
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
    pdf.autoTable(col, rowD,
      {
        addPageContent: pageContent,
        margin: {top: 160},
      });

    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');

  }


}
