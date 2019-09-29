import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Security} from '../Security';
import {UpdateSecurityComponent} from '../update-security/update-security.component';


@Component({
  selector: 'app-view-site-security-person',
  templateUrl: './view-site-security-person.component.html',
  styleUrls: ['./view-site-security-person.component.css']
})
export class ViewSiteSecurityPersonComponent implements OnInit, AfterViewInit {

  constructor(private  route: ActivatedRoute, private router: Router,
              private  securityservice: IncidentService, public dialog: MatDialog) { }

  cname: string;
  id: number;
  index: number;
  securityId: number;
  security: Security[] = [];
  displayedColumns: string[] = ['Site Name', 'Security Name', 'Work Time', 'Phone number', 'actions'];
  public dataSource1 = new MatTableDataSource<Security>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  exampleDatabase: IncidentService |null;
  expandedElement: Security;


  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  ngOnInit() {


    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.securityservice.getSecurity()
      .subscribe(data => this.dataSource1.data = data as Security[]);
    this.securityservice.getSecurity().subscribe(data => this.security);
    this.cname = this.route.snapshot.params.cname;
    if (this.cname != null) {
      this.applyFilter(this.cname);
    }

  }

  ngAfterViewInit(): void {
    this.dataSource1.sort = this.sort;

  }
  delete(id: number) {
    this.securityservice.deleteSecurity(id);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['Security/add-site-security-person']);
  }

  startEdit(securityId1: number, siteName1: string, securityName1: string,
            phoneNumber1: string, workTime1: string) {

    this.securityId = securityId1;
    console.log(this.index);

    const dialogRef = this.dialog.open(UpdateSecurityComponent, {
      width: '600px',
      data: {siteName: siteName1, securityId: securityId1, securityName: securityName1, phoneNumber: phoneNumber1, workTime: workTime1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange1.value.findIndex(x => x.securityId === this.securityId);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange1.value[foundIndex] = this.securityservice.getDialogData1();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }


}
