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

@Component({
  selector: 'app-view-ongoing-project',
  templateUrl: './view-ongoing-project.component.html',
  styleUrls: ['./view-ongoing-project.component.css'],
  providers: [DatePipe]
})
export class ViewOngoingProjectComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router, private projectservice: ProjectServicesService, public dialog: MatDialog) { }
  projectId: string;
  index: number;
  project1: IProject;
  displayedColumns: string[] = ['projectId', 'projectName', 'projectType', 'projectPriority', 'startingDate', 'completionPeriod',
    'status', 'details', 'teamId', 'actions'];
  public dataSource = new MatTableDataSource<IProject>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: ProjectServicesService | null;

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
    this.router.navigate(['../add-new-project']);
  }

  startEdit(projectId: string, projectName: string, projectType: string, projectPriority: string,
            startingDate: string, completionPeriod: string, status: string, details: string, teamId: string) {

    this.projectId = projectId;
    console.log(this.index);
    const dialogRef = this.dialog.open(UpdateOngoingProjectComponent, {
      data: {projectId: projectId, projectName: projectName, projectType: projectType, projetPrority: projectPriority, startingDate: startingDate, completionPeriod: completionPeriod
             , status: status, details: details, teamId: teamId}
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
