import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SiteDetails} from '../site-details';
import {MatSort} from '@angular/material';
import {SiteDetailsService} from '../site-details.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-all-sites',
  templateUrl: './view-all-sites.component.html',
  styleUrls: ['./view-all-sites.component.css'],
  providers: [DatePipe]
})
export class ViewAllSitesComponent implements OnInit {

  displayedColumns: string[] = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
    'commissionedDate', 'commissionedDate3G'];
  public dataSource = new MatTableDataSource<SiteDetails>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private siteDetailsService: SiteDetailsService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.siteDetailsService.findAll().subscribe( data => this.dataSource.data = data as SiteDetails[]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToView(siteID: string) {
    this.router.navigate(['Site/view-site-details/' + siteID]).then();
  }

}