import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Visitors} from '../Visitors';
import {MatTableDataSource} from '@angular/material/table';



import {DataSource} from '@angular/cdk/table';
import {UpdateOngoingProjectComponent} from '../../OngoingProject/update-ongoing-project/update-ongoing-project.component';
import {UpdateVisitorsComponent} from '../update-visitors/update-visitors.component';



@Component({
  selector: 'app-view-visitors',
  templateUrl: './view-visitors.component.html',
  styleUrls: ['./view-visitors.component.css'],
  providers: [DatePipe]
})
export class ViewVisitorsComponent implements OnInit, AfterViewInit {

  constructor(private  route: ActivatedRoute, private router: Router,
              private  visitorservice: IncidentService, public dialog: MatDialog) { }


   visitorId: number;
   cname: string;
   id: number;
   index: number;
   visit1: Visitors[] = [];
   displayedColumns: string[] = ['Site Name', 'Visitor Name', 'Visit Date', 'In time', 'Exit Time', 'Description', 'actions'];
   public dataSource1 = new MatTableDataSource<Visitors>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: IncidentService |null;
  expandedElement: Visitors;


  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  ngOnInit() {

    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.visitorservice.getVisitors()
      .subscribe(data => this.dataSource1.data = data as Visitors[]);
    this.visitorservice.getVisitors().subscribe(data => this.visit1);
    this.cname = this.route.snapshot.params.cname;
    if (this.cname != null) {
      this.applyFilter(this.cname);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource1.sort = this.sort;

  }

  delete(id: number) {
    this.visitorservice.deleteVisitors(id);
    this.gotoViewVisitors();
  }

  gotoViewVisitors() {
    // this.router.navigate(['/view-maintenance']);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['Security/add-visitors']);
  }


  startEdit(visitorId: number, siteName: string, visitorName: string, visitDate: string,
            intime: string, exitTime: string, description: string) {

    this.visitorId = visitorId;
    console.log(this.index);
    const dialogRef = this.dialog.open(UpdateVisitorsComponent, {
     data: {visitorId: visitorId,visitorName: visitorName, visitDate: visitDate, intime: intime,exitTime: exitTime,description: description}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.visitorId = visitorId);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.visitorservice.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }


}


