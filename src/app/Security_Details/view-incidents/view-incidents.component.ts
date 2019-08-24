import {Component, OnInit, ViewChild} from '@angular/core';
import {Incident} from '../Incident';
import {IncidentService} from '../IncidentService';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {MaintenaceDataSource} from '../../Maintenance/view-maintenance/view-maintenance.component';


@Component({
  selector: 'app-view-incidents',
  templateUrl: './view-incidents.component.html',
  styleUrls: ['./view-incidents.component.css']
})
export class ViewIncidentsComponent implements OnInit {

  public incident = [];
  constructor( private incidentServe: IncidentService) { }

  incident1: Incident;
  dataSource: IncidentDataSourse;
  displayedColumns: string[] = ['incidentId', 'SiteName', 'IncidentDate',
    'SummeryOfTheIncident', 'DateOfInform', 'DescriptionStolenProperty',
    'ProvideAbansSecurity', 'ComlaintName', 'NameOfThePoliceStation',
    'ObtainPoliceReport', 'Remarks'];
  public dataSource1 = new MatTableDataSource(this.incident);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource = new IncidentDataSourse(this.incidentServe);
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










