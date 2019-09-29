import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaintenanceServicesService} from './MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ResolveMaintenanceComponent} from '../resolve-maintenance/resolve-maintenance.component';
import {MatSort, MatSortable} from '@angular/material';
import {DatePipe} from '@angular/common';
import {CompleteMaintenanceComponent} from '../complete-maintenance/complete-maintenance.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import 'jspdf-autotable';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {ConfirmDeleteboxComponent} from '../confirm-deletebox/confirm-deletebox.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ViewMaintenanceComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute, private router: Router,
              private maintenanceservice: MaintenanceServicesService, public dialog: MatDialog) {
  }


  cname: string;
  id: number;
  index: number;
  renderedData: any;
  data1: IMaintenance[] = [];
  public maintenances = [];
  displayedColumns: string[] = ['ids', 'sid', 'sname', 'category', 'piority',
    'status', 'idate', 'cost', 'conname', 'rdate', 'cdate', 'actions'];
  public dataSource1 = new MatTableDataSource<IMaintenance>();
  tableFooterColumns: string[] = ['ids', 'cost'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: MaintenanceServicesService | null;
  expandedElement: IMaintenance;


  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  ngOnInit() {


    this.dataSource1.paginator = this.paginator;
    this.sort.sort(({id: 'idate', start: 'desc'}) as MatSortable);
    this.dataSource1.sort = this.sort;
    this.maintenanceservice.getMaintenance()
      .subscribe(data => this.dataSource1.data = data as IMaintenance[]);
    this.maintenanceservice.getMaintenance().subscribe(data => this.data1);
    this.cname = this.route.snapshot.params.cname;
    if (this.cname != null) {
      this.applyFilter(this.cname);
    }

    this.dataSource1.connect().subscribe(d => this.renderedData = d);

    this.maintenanceservice.getMaintenance().subscribe(data => this.maintenances = data);

  }


  ngAfterViewInit(): void {
    this.dataSource1.sort = this.sort;

  }

  delete(id: number) {
    // this.deletconfirmbox('Are You Sure To Delete ?')
    //   .afterClosed().subscribe(res => {
    //   console.log(res);
    //   if (res) {
    this.maintenanceservice.deleteMaintenance(id);
    window.location.reload();
    //  }


  }

  gotoViewMaintenance() {
    // this.router.navigate(['/view-maintenance']);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['/Maintenance/add-maintenance']);
  }

  startEdit(mid: number, msname: string, mcategory: string, missue: string,
            mpiority: string, midate: string, msiteid: string) {
    this.id = mid;
    // this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(ResolveMaintenanceComponent, {
      width: '600px',
      data: {ids: mid, sname: msname, category: mcategory, issue: missue, piority: mpiority, idate: midate, sid: msiteid}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.ids === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.maintenanceservice.getDialogData();

      }
    });
  }

  startEditCom(id: number, name: string, mcategory: string, missue: string,
               mpiority: string, midate: string, mcost: string, mconname: string, mrdate: string, msiteid: string) {
    this.id = id;
    // this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(CompleteMaintenanceComponent, {
      width: '600px',
      data: {
        ids: id,
        sname: name,
        category: mcategory,
        issue: missue,
        piority: mpiority,
        idate: midate,
        cost: mcost,
        conname: mconname,
        rdate: mrdate,
        sid: msiteid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.ids === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.maintenanceservice.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }

  deletconfirmbox(msg) {
    return this.dialog.open(ConfirmDeleteboxComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
      }
    });
  }


  viewcondetails(id: string) {
    this.router.navigate(['Maintenance/view-contractors', id]);
  }

  print() {
    // new Angular5Csv(this.renderedData, 'Maintenance Report');
  }

  SearchDirection(name: string) {
    this.router.navigate(['/siteMap/directmap/', name]);
  }


  goToView(siteID: string) {
    this.router.navigate(['Site/view-site-details/' + siteID]).then();
  }

  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['MaintenanceID', 'siteID', 'siteName', 'Category', 'Discription', 'Piority', 'Status',
      'Inform Date', 'Contractor Name', 'Cost', 'Refactor Date', 'Completed Date']; // initialization for headers
    const title = 'Sample Report of Maintenance'; // title of report
    for (let i = 0; i < this.maintenances.length; i++) {
      row.push(this.maintenances[i].id);
      row.push(this.maintenances[i].sid);
      row.push(this.maintenances[i].sname);
      row.push(this.maintenances[i].category);
      row.push(this.maintenances[i].issue);
      row.push(this.maintenances[i].piority);
      row.push(this.maintenances[i].status);
      row.push(this.maintenances[i].idate);
      row.push(this.maintenances[i].conname);
      row.push(this.maintenances[i].cost);
      row.push(this.maintenances[i].rdate);
      row.push(this.maintenances[i].cdate);
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
    pdf.text('Maintenance', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
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
    //     addPageContent: pageContent,
    //     margin: {top: 160},
    //     });

    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');

  }

  getreporttoeach(id, sid, sname, cat, issue, piority, status, idate, conname, cost, rdate, cdate) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Maintenance', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Maintenance ID: ' + id, 435, 130).setFontSize(10);  //
    pdf.setLineWidth(1.5);

    //  pdf.text('Maintenance ID       :' + id, 140, 180).setFontSize(8);
    pdf.text('Site ID              :' + sid, 140, 190).setFontSize(12);
    pdf.text('Site Name            :' + sname, 140, 210).setFontSize(12);
    pdf.text('Category             :' + cat, 140, 230).setFontSize(12);
    pdf.text('Discription          :' + issue, 140, 250).setFontSize(12);
    pdf.text('Piority              :' + piority, 140, 270).setFontSize(12);
    pdf.text('Status               :' + status, 140, 290).setFontSize(12);
    pdf.text('Informed Date        :' + idate, 140, 310).setFontSize(12);
    pdf.text('Contractor Name      :' + conname, 140, 330).setFontSize(12);
    pdf.text('Cost                 :' + cost, 140, 350).setFontSize(12);
    pdf.text('Refactor Date        :' + rdate, 140, 370).setFontSize(12);
    pdf.text('Completed Date       :' + cdate, 140, 390).setFontSize(12);

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

    pdf.save('Maintenance' + id + '.pdf');

  }

}


