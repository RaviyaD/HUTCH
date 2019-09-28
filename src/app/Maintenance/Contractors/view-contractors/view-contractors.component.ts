import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MaintenanceServicesService} from '../../view-maintenance/MaintenanceServices';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {IMaintenance} from '../../Maintenance';
import {IContractors} from '../IContractors';
import {AddContractorComponent} from '../add-contractor/add-contractor.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-contractors',
  templateUrl: './view-contractors.component.html',
  styleUrls: ['./view-contractors.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewContractorsComponent implements OnInit {

  cname: string;
  expandedElement: IContractors | null;

  constructor(private maintenanceservice: MaintenanceServicesService,  public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  displayedColumns: string[] = ['id', 'cname', 'address', 'telno', 'email', 'nic' , 'regdate', 'actions'];
  exampleDatabase: MaintenanceServicesService | null;
  public dataSource = new MatTableDataSource<IContractors>();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit() {
    this.maintenanceservice.getConstructors()
      .subscribe(data => this.dataSource.data = data as IContractors[]);
    this.cname = this.route.snapshot.params.cname;
    if (this.cname != null) {
      this.applyFilter(this.cname);
    }
  }


  addNew(icontractors: IContractors) {
    const dialogRef = this.dialog.open(AddContractorComponent, {
      width: '600px',
      data: {icontractor : icontractors},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
     //   this.exampleDatabase.dataChangeCon.value.push(this.maintenanceservice.getDialogData());

      }
    });
  }

   viewmaintenance( id: string) {
    this.router.navigate(['Maintenance/view-maintenance', id]);
  }



}
