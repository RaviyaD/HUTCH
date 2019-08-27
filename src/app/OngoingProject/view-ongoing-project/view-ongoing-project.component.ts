import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ProjectServicesService} from './ProjectServices';
import {IProject} from '../Project';
import {Observable} from 'rxjs';
import { DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-view-ongoing-project',
  templateUrl: './view-ongoing-project.component.html',
  styleUrls: ['./view-ongoing-project.component.css']
})
export class ViewOngoingProjectComponent implements OnInit {

  public project = [];
  constructor(private projectservice: ProjectServicesService) { }
  project1: IProject;
  dataSource: ProjectDataSource;
  displayedColumns: string[] = ['projectId', 'projectName', 'projectType', 'projectPriority', 'startingDate', 'completionPeriod',
    'status', 'details', 'teamId', 'actions'];
  public dataSource1 = new MatTableDataSource(this.project);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource = new ProjectDataSource(this.projectservice);
    this.dataSource1.paginator = this.paginator;
    this.projectservice.getProject().subscribe(data => this.project = data);
  }

  delete(projectId: string) {
    this.projectservice.deleteProject(projectId);
    window.location.reload();
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
