import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaintenanceServicesService} from './MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import { DataSource} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ResolveMaintenanceComponent} from '../resolve-maintenance/resolve-maintenance.component';

@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css']
})



export class ViewMaintenanceComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,
              private maintenanceservice: MaintenanceServicesService, public dialog: MatDialog) {}
  public maintenance1 = [];
  private dialog1: MatDialog;


  maintenance: IMaintenance;
  dataSource: MaintenaceDataSource;
  id: number;
  index: number;
  displayedColumns: string[] = ['ids', 'sname', 'category', 'issue', 'piority', 'status', 'idate', 'actions'];
  public dataSource1 = new MatTableDataSource(this.maintenance1);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  exampleDatabase: MaintenanceServicesService | null;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

  }

  delete(id: number) {
    this.maintenanceservice.deleteMaintenance(id);
  }

  gotoViewMaintenance() {
    this.router.navigate(['/view-maintenance']);
  }

  gotoadd() {
    this.router.navigate(['/add-maintenance']);
  }
  startEdit(id: number, sname: string, category: string, issue: string,
            piority: string, idate: string) {
    this.id = id;
    // this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(ResolveMaintenanceComponent, {
      data: {id, sname, category, issue, piority, idate }
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


