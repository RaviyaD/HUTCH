import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaintenanceServicesService} from './MaintenanceServices';
export interface PeriodicElement {
  id: number;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css']
})
export class ViewMaintenanceComponent implements OnInit {

  public maintenance1 = [];
  constructor(private maintenanceservice: MaintenanceServicesService) {}


  displayedColumns: string[] = ['ids', 'sname'];
  public dataSource1 = new MatTableDataSource(this.maintenance1);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource1.paginator = this.paginator;
    this.maintenanceservice.getMaintenance()
      .subscribe(data => this.maintenance1 = data);
    this.dataSource1.data = Object.values(this.maintenance1);
  }
}
