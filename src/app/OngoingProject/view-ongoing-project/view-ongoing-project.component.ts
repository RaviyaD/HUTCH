import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ProjectServicesService} from './ProjectServices';
import {IProject} from '../Project';
import {BehaviorSubject, merge, Observable} from 'rxjs';
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
                                'status', 'details', 'teamId'];
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
