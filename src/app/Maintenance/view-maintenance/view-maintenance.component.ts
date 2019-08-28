import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaintenanceServicesService} from './MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ResolveMaintenanceComponent} from '../resolve-maintenance/resolve-maintenance.component';
import {MatSort} from '@angular/material';

@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css']
})



export class ViewMaintenanceComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute, private router: Router,
              private maintenanceservice: MaintenanceServicesService, public dialog: MatDialog) {}




  id: number;
  index: number;
  displayedColumns: string[] = ['ids', 'sname', 'category', 'issue', 'piority', 'status', 'idate', 'cost', 'rdate', 'actions'];
  public dataSource1 = new MatTableDataSource<IMaintenance>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: MaintenanceServicesService | null;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  ngOnInit() {

   // this.dataSource = new MaintenaceDataSource(this.maintenanceservice);
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.maintenanceservice.getMaintenance()
      .subscribe(data => this.dataSource1.data = data as IMaintenance[]);

  }
  ngAfterViewInit(): void {
    this.dataSource1.sort = this.sort;

  }

  delete(id: number) {
    this.maintenanceservice.deleteMaintenance(id);
    this.gotoViewMaintenance();
  }

  gotoViewMaintenance() {
    // this.router.navigate(['/view-maintenance']);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['/Maintenance/add-maintenance']);
  }
  startEdit(id: number, sname: string, category: string, issue: string,
            piority: string, idate: string) {
    this.id = id;
    // this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(ResolveMaintenanceComponent, {
      data: {ids: id, sname: sname, category: category, issue: issue, piority: piority, idate: idate }
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


