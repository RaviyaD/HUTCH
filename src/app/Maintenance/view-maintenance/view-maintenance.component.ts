import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaintenanceServicesService} from './MaintenanceServices';
import {IMaintenance} from '../Maintenance';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ResolveMaintenanceComponent} from '../resolve-maintenance/resolve-maintenance.component';
import {MatSort} from '@angular/material';
import {DatePipe} from '@angular/common';
import {CompleteMaintenanceComponent} from '../complete-maintenance/complete-maintenance.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class ViewMaintenanceComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute, private router: Router,
              private maintenanceservice: MaintenanceServicesService, public dialog: MatDialog) {}


  cname: string;
  id: number;
  index: number;
  data1: IMaintenance[];
  displayedColumns: string[] = ['ids', 'sid', 'sname', 'category',  'piority',
    'status', 'idate', 'cost', 'conname', 'rdate', 'cdate', 'actions'];
  public dataSource1 = new MatTableDataSource<IMaintenance>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: MaintenanceServicesService | null;
  expandedElement: IMaintenance;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  ngOnInit() {


    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.maintenanceservice.getMaintenance()
      .subscribe(data => this.dataSource1.data = data as IMaintenance[]);
    this.cname = this.route.snapshot.params.cname;
    if (this.cname != null) {
      this.applyFilter(this.cname);
    }

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

  startEditCom(id: number, sname: string, category: string, issue: string,
            piority: string, idate: string, cost: string, conname: string, rdate: string) {
    this.id = id;
    // this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(CompleteMaintenanceComponent, {
      data: {ids: id, sname: sname, category: category, issue: issue, piority: piority, idate: idate, cost: cost, conname: conname, rdate: rdate }
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

  viewcondetails(id: string) {
    console.log(id);
    this.router.navigate(['Maintenance/view-contractors', id]);
  }


}


