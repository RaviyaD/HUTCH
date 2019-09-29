import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Incident} from '../Incident';
import {IncidentService} from '../IncidentService';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import * as jsPDF from "jspdf";
import {DatePipe} from '@angular/common';
import {Visitors} from '../Visitors';

@Component({
  selector: 'app-view-incidents',
  templateUrl: './view-incidents.component.html',
  styleUrls: ['./view-incidents.component.css']
})
export class ViewIncidentsComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router, private incidentServe: IncidentService) { }

  incidentId: number;
  public incidents = [];
  incident1: Incident;
  displayedColumns: string[] = ['siteName', 'incidentDate',
    'summeryOfTheIncident',  'descriptionStolenProperty',
     'remarks', 'actions'];
  public dataSource = new MatTableDataSource<Incident>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 // exampleDatabase: IncidentService | null;
 // expandedElement: Incident;


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.incidentServe.getIncident().subscribe(data => this.dataSource.data = data as Incident[]);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  delete(id: number) {
    this.incidentServe.delete(id);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['Security/add-incidents']);
  }

  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['incidentId',  'siteName', 'incident Date', 'summeryOfTheIncident', 'descriptionStolenProperty', 'dateOfInform', 'informerName', 'provideAbansSecurity', 'dateOfEntry', 'nameOfThePoliceStation', 'obtainPoliceReport', 'remarks']; // initialization for headers
    const title = 'Sample Report of Incident'; // title of report
    for (let i = 0; i < this.incidents.length; i++) {
      row.push(this.incidents[i].incidentId);
      row.push(this.incidents[i].siteName);
      row.push(this.incidents[i].incidentDate);
      row.push(this.incidents[i].summeryOfTheIncident);
      row.push(this.incidents[i].descriptionStolenProperty);
      row.push(this.incidents[i].dateOfInform);
      row.push(this.incidents[i].informerName);
      row.push(this.incidents[i].provideAbansSecurity);
      row.push(this.incidents[i].dateOfEntry);
      row.push(this.incidents[i].nameOfThePoliceStation);
      row.push(this.incidents[i].obtainPoliceReport);
      row.push(this.incidents[i].remarks);









      rowD.push(row);
      row = [];
    }


    this.getReport(col, rowD, title);
  }

  getReport(col: any[], rowD: any[], title: any) {
    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Site Visitors', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('' + title, 435, 130).setFontSize(10);  //
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
   // pdf.autoTable(col, rowD,
    //  {
     //   addPageContent: pageContent,
     //   margin: {top: 160},
    //  });

    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');

  }
  getreporttoeach(incidentId, siteName, incidentDate, summeryOfTheIncident, descriptionStolenProperty, dateOfInform, informerName, provideAbansSecurity, dateOfEntry, nameOfThePoliceStation, obtainPoliceReport, remarks) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Site Incidents', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Incident ID: ' + incidentId, 435, 130).setFontSize(10);  //
    pdf.setLineWidth(1.5);

    // pdf.text('Visitor ID              :' + visitorId, 140, 190).setFontSize(12);
    pdf.text('Site Name                 :' + siteName, 140, 210).setFontSize(12);
    pdf.text('Incidant Date             :' + incidentDate, 140, 230).setFontSize(12);
    pdf.text('Summery incident          :' + summeryOfTheIncident, 140, 250).setFontSize(12);
    pdf.text('stolen Property           :' + descriptionStolenProperty, 140, 270).setFontSize(12);
    pdf.text('infomr date               :' + dateOfInform, 140, 290).setFontSize(12);
    pdf.text('informer name            :' + informerName, 140, 310).setFontSize(12);
    pdf.text('Abans security           :' + provideAbansSecurity, 140, 330).setFontSize(12);
    pdf.text('police Station            :' + nameOfThePoliceStation, 140, 350).setFontSize(12);
    pdf.text('police repot              :' + obtainPoliceReport, 140, 370).setFontSize(12);
    pdf.text('Remarks                  :' + remarks, 140, 390).setFontSize(12);
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

    pdf.save('Incident Id' + incidentId + '.pdf');

  }




}

export class IncidentDataSourse extends DataSource<any> {
  constructor(private incidentService: IncidentService) {
    super();
  }
  connect(): Observable<Incident[]> {
    return this.incidentService.getIncident();
  }
  disconnect() {}

}










