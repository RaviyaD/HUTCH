import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ProjectServicesService} from './ProjectServices';
import {IProject} from '../Project';
import {Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSort} from '@angular/material';
import {UpdateOngoingProjectComponent} from '../update-ongoing-project/update-ongoing-project.component';
import {DatePipe} from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-view-ongoing-project',
  templateUrl: './view-ongoing-project.component.html',
  styleUrls: ['./view-ongoing-project.component.css'],
  providers: [DatePipe]
})
export class ViewOngoingProjectComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router, private projectservice: ProjectServicesService, public dialog: MatDialog) { }

  public projects = [];
  data1: IProject[] = [];
  renderedData: any;

  projectId: string;
  index: number;

  displayedColumns: string[] = ['projectId', 'Name', 'Type', 'startingDate', 'completionPeriod',
    'status', 'details', 'teamId', 'specId', 'scope', 'actions'];
  public dataSource = new MatTableDataSource<IProject>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: ProjectServicesService | null;
  expandedElement: IProject;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.projectservice.getProject().subscribe(data => this.dataSource.data = data as IProject[]);
    this.projectservice.getProject().subscribe(data => this.data1);

    this.dataSource.connect().subscribe(d => this.renderedData = d);
    this.projectservice.getProject().subscribe(data => this.projects = data);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  delete(projectId: string) {
    this.projectservice.deleteProject(projectId);
    window.location.reload();
  }
  gotoViewProject() {
    this.router.navigate(['../view-ongoing-project']);
    window.location.reload();
  }
  gotoadd() {
    this.router.navigate(['Ongoing/add-new-project']);
  }

  startEdit(projectId1: string, projectName1: string, projectType1: string, startingDate1: string, completionPeriod1: string,
            status1: string, details1: string, teamId1: string, specId1: string, scope1: string) {

    this.projectId = projectId1;
    console.log(this.index);
    const dialogRef = this.dialog.open(UpdateOngoingProjectComponent, {
      data: {projectId: projectId1, projectName: projectName1, projectType: projectType1, startingDate: startingDate1, completionPeriod: completionPeriod1
             , status: status1, details: details1, teamId: teamId1, specId: specId1, scope: scope1}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.projectId === this.projectId);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.projectservice.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }

  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['ProjectID', 'Project Name', 'Project Type', 'StartingDate', 'CompletionPeriod', 'Status',
      'Details', 'TeamId', 'SpecId', 'Scope' ]; // initialization for headers
    const title = 'Sample Report of OngoingProjects'; // title of report
    for (let i = 0; i < this.projects.length; i++) {
      row.push(this.projects[i].projectId);
      row.push(this.projects[i].projectName);
      row.push(this.projects[i].projectType);
      row.push(this.projects[i].startingDate);
      row.push(this.projects[i].completionPeriod);
      row.push(this.projects[i].status);
      row.push(this.projects[i].details);
      row.push(this.projects[i].teamId);
      row.push(this.projects[i].specId);
      row.push(this.projects[i].scope);
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
    pdf.text('OngoingProject', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
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
    //    addPageContent: pageContent,
    //   margin: {top: 160},
    //  });

    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');

  }

  getreporttoeach(projectId, projectName, projectType, startingDate, completionPeriod, status, details, teamId, specId, scope) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('OngoingProject', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Project ID: ' + projectId, 435, 130).setFontSize(10);  //
    pdf.setLineWidth(1.5);

    //  pdf.text('Project ID       :' + projectId, 140, 180).setFontSize(8);
    pdf.text('Project ID              :' + projectId, 140, 190).setFontSize(12);
    pdf.text('Project Name            :' + projectName, 140, 210).setFontSize(12);
    pdf.text('Project Type            :' + projectType, 140, 230).setFontSize(12);
    pdf.text('StartingDate            :' + startingDate, 140, 250).setFontSize(12);
    pdf.text('CompletionPeriod        :' + completionPeriod, 140, 270).setFontSize(12);
    pdf.text('Status                  :' + status, 140, 290).setFontSize(12);
    pdf.text('Details                 :' + details, 140, 310).setFontSize(12);
    pdf.text('TeamId                  :' + teamId, 140, 330).setFontSize(12);
    pdf.text('SpecId                  :' + specId, 140, 350).setFontSize(12);
    pdf.text('Scope                   :' + scope, 140, 370).setFontSize(12);

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

    pdf.save('OngoingProject' + projectId + '.pdf');

  }

}

export class ProjectDataSource extends DataSource<any> {
  constructor(private projectService: ProjectServicesService) {
    super();
  }
  connect(): Observable<IProject[]> {
    return this.projectService.getProject();
  }
  disconnect() {}
}
