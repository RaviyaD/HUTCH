import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Visitors} from '../Visitors';
import {MatTableDataSource} from '@angular/material/table';



import {DataSource} from '@angular/cdk/table';
import {UpdateOngoingProjectComponent} from '../../OngoingProject/update-ongoing-project/update-ongoing-project.component';
import {UpdateVisitorsComponent} from '../update-visitors/update-visitors.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';



@Component({
  selector: 'app-view-visitors',
  templateUrl: './view-visitors.component.html',
  styleUrls: ['./view-visitors.component.css'],
  providers: [DatePipe]
})
export class ViewVisitorsComponent implements OnInit, AfterViewInit {

  constructor(private  route: ActivatedRoute, private router: Router,
              private  visitorservice: IncidentService, public dialog: MatDialog) { }


   visitorId: number;
   cname: string;
   id: number;
   index: number;
   public visiters = [];
   visit1: Visitors[] = [];
   displayedColumns: string[] = ['Site Name', 'Visitor Name', 'Visit Date', 'In time', 'Exit Time', 'Description', 'actions'];
   public dataSource1 = new MatTableDataSource<Visitors>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: IncidentService |null;
  expandedElement: Visitors;


  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  ngOnInit() {

    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.visitorservice.getVisitors()
      .subscribe(data => this.dataSource1.data = data as Visitors[]);
    this.visitorservice.getVisitors().subscribe(data => this.visit1);
    this.cname = this.route.snapshot.params.cname;
    if (this.cname != null) {
      this.applyFilter(this.cname);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource1.sort = this.sort;

  }

  delete(id: number) {
    this.visitorservice.deleteVisitors(id);
    this.gotoViewVisitors();
  }

  gotoViewVisitors() {
    // this.router.navigate(['/view-maintenance']);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['Security/add-visitors']);
  }


  startEdit(vsiteName: string, vvisitorId: number, vvisitorName: string, vvisitDate: string,
            vintime: string, vexitTime: string, vdescription: string) {

    this.visitorId = vvisitorId;
    console.log(this.index);
    const dialogRef = this.dialog.open(UpdateVisitorsComponent, {
      width: '600px',
     data: {siteName: vsiteName, visitorId: vvisitorId, visitorName: vvisitorName, visitDate: vvisitDate, intime: vintime, exitTime: vexitTime, description: vdescription}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.visitorId === this.visitorId);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.visitorservice.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }

  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['visitorId',  'siteName', 'visitor Name', 'In Time', 'Exit Time', 'Description']; // initialization for headers
    const title = 'Sample Report of Vsitors'; // title of report
    for (let i = 0; i < this.visiters.length; i++) {
      row.push(this.visiters[i].visitorId);
      row.push(this.visiters[i].siteName);
      row.push(this.visiters[i].visitorName);
      row.push(this.visiters[i].vistDate);
      row.push(this.visiters[i].intime);
      row.push(this.visiters[i].exitTime);
      row.push(this.visiters[i].description);


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
   //   {
       //  addPageContent: pageContent,
       //  margin: {top: 160},
       //  });

    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');

  }

  getreporttoeach(visitorId, siteName, visitorName, vistDate, intime, exitTime, description ) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Site Visitors', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Visitor ID: ' + visitorId, 435, 130).setFontSize(10);  //
    pdf.setLineWidth(1.5);

   // pdf.text('Visitor ID              :' + visitorId, 140, 190).setFontSize(12);
    pdf.text('Site Name            :' + siteName, 140, 210).setFontSize(12);
    pdf.text('Visitor Name         :' + visitorName, 140, 230).setFontSize(12);
    pdf.text('Date               :' + vistDate, 140, 250).setFontSize(12);
    pdf.text('In time             :' + intime, 140, 270).setFontSize(12);
    pdf.text('Exit time             :' + exitTime, 140, 290).setFontSize(12);
    pdf.text('Description        :' + description, 140, 310).setFontSize(12);

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

    pdf.save('Visitor Id' + visitorId + '.pdf');

  }



}


