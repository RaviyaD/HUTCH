import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaintenanceServicesService} from './MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import { DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css']
})



export class ViewMaintenanceComponent implements OnInit {
  public maintenance1 = [];
  constructor(private maintenanceservice: MaintenanceServicesService) {}


  maintenance: IMaintenance;
  dataSource: MaintenaceDataSource;
  displayedColumns: string[] = ['ids', 'sname', 'category', 'issue', 'piority', 'status', 'idate'];
  public dataSource1 = new MatTableDataSource(this.maintenance1);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource = new MaintenaceDataSource(this.maintenanceservice);
    this.dataSource1.paginator = this.paginator;
    this.maintenanceservice.getMaintenance()
      .subscribe(data => this.maintenance1 = data);
  //  this.dataSource1.data = Object.values(this.maintenance1);
  }
}

export class MaintenaceDataSource extends DataSource<any> {
  constructor(private maintenanceService: MaintenanceServicesService) {
    super();
  }
  connect(): Observable<IMaintenance[]> {
    return this.maintenanceService.getMaintenance();
  }
  disconnect() {}
}


