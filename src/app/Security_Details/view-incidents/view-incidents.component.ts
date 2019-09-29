import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Incident} from '../Incident';
import {IncidentService} from '../IncidentService';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-incidents',
  templateUrl: './view-incidents.component.html',
  styleUrls: ['./view-incidents.component.css']
})
export class ViewIncidentsComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router, private incidentServe: IncidentService) { }

  incident1: Incident;
  displayedColumns: string[] = ['incidentId', 'siteName', 'incidentDate',
    'summeryOfTheIncident', 'dateOfInform', 'informerName' , 'descriptionStolenProperty',
    'provideAbansSecurity', 'dateOfEntry', 'nameOfThePoliceStation',
    'obtainPoliceReport', 'remarks'];
  public dataSource = new MatTableDataSource<Incident>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: IncidentService | null;

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










