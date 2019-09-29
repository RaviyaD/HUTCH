import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Security} from '../Security';
import {Visitors} from '../Visitors';


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
    this.gotoViewSecurity();
  }
  gotoViewSecurity() {
    // this.router.navigate(['/view-maintenance']);
    window.location.reload();
  }

  gotoadd() {
    this.router.navigate(['Security_Details/add-visitors']);
  }



}
