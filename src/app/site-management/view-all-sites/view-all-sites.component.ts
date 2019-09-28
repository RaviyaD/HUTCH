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

  public display = true;
  public cellAntLocDet = true;
  cellAntLocType = true;
  bscrnc = true;
  cabinDet = true;
  displayedColumns: string[] = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
    'commissionedDate', 'commissionedDate3G'];
  newColumns: string[] = ['bsc'];
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

  toggleColumn() {
    if (this.display === true) {
      /*this.displayedColumns.push('latitude');
      this.displayedColumns.push('longitude');
      this.displayedColumns.push('subRegion');
      this.displayedColumns.push('address');
      this.displayedColumns.push('altitude');
      this.displayedColumns.push('towerType');
      this.displayedColumns.push('towerHeight');
      this.displayedColumns.push('buildingHeight');*/
      this.displayedColumns = ['siteID', 'latitude', 'longitude', 'subRegion', 'address', 'altitude',
        'towerType', 'towerHeight', 'buildingHeight'];
    } else {
      /*this.Remove('latitude');
      this.Remove('longitude');
      this.Remove('subRegion');
      this.Remove('address');
      this.Remove('altitude');
      this.Remove('towerType');
      this.Remove('towerHeight');
      this.Remove('buildingHeight');*/
      this.displayedColumns = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
        'commissionedDate', 'commissionedDate3G'];
    }
    this.display = !this.display;
  }
  /*public RemoveAt(index: number): void {
    this.displayedColumns.splice(index, 1);
  }

  public Remove(value: string): void {
    const index = this.displayedColumns.indexOf(value);
    this.RemoveAt(index);
  }*/
  toggleCellAntLocDet() {
    if (this.cellAntLocDet === true) {
      this.displayedColumns = ['siteID', 'heightInTower',
        'sector1Direction', 'sector2Direction', 'sector3Direction', 'sector1HBW', 'sector2HBW', 'sector3HBW', 'sector1Tilt2g',
        'sector2Tilt2g', 'sector3Tilt2g', 'sector1Tilt3g', 'sector2Tilt3g', 'sector3Tilt3g'];
    } else {
      this.displayedColumns = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
        'commissionedDate', 'commissionedDate3G'];
    }
    this.cellAntLocDet = !this.cellAntLocDet;
  }
  toggleCellAntType() {
    if (this.cellAntLocType === true) {
      this.displayedColumns = ['siteID', 'bandType', 'antProdName3g', 'antHBW3g', 'antModel3g', 'antQty3g', 'bisectorAntSectorNo3G',
        'antHBW2g', 'antModel2g', 'antQty2g900', 'antQty2g1800', 'totalAntQty'];
    } else {
      this.displayedColumns = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
        'commissionedDate', 'commissionedDate3G'];
    }
    this.cellAntLocType = !this.cellAntLocType;
  }
  toggleBSCRNC() {
    if (this.bscrnc === true) {
      this.displayedColumns = ['siteID', 'bsc', 'rnc', 'btsType', 'btsModel', 'trxType2g'];
    } else {
      this.displayedColumns = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
        'commissionedDate', 'commissionedDate3G'];
    }
    this.bscrnc = !this.bscrnc;
  }
  toggleCabinDet() {
    if (this.cabinDet === true) {
      this.displayedColumns = ['siteID', 'equipmentType', 'shelterType', 'shelterSize', 'accessoriesInShelter'];
    } else {
      this.displayedColumns = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
        'commissionedDate', 'commissionedDate3G'];
    }
    this.cabinDet = !this.cabinDet;
  }
}
