import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SiteDetails} from '../site-details';
import {MatSort} from '@angular/material';
import {SiteDetailsService} from '../site-details.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GoogleChartComponent} from 'angular-google-charts';
import {Count} from '../Count';
import {CountT} from '../CountT';

@Component({
  selector: 'app-view-all-sites',
  templateUrl: './view-all-sites.component.html',
  styleUrls: ['./view-all-sites.component.css'],
  providers: [DatePipe]
})
export class ViewAllSitesComponent implements OnInit {

  @ViewChild('chart', {static: false})
  chart: GoogleChartComponent;
  @ViewChild('chartO', {static: false})
  chartO: GoogleChartComponent;
  @ViewChild('chartT', {static: false})
  chartT: GoogleChartComponent;
  public display = true;
  public cellAntLocDet = true;
  cellAntLocType = true;
  bscrnc = true;
  cabinDet = true;
  displayedColumns: string[] = ['siteID', 'siteName', 'ownership', 'ownerSiteName', 'frequencyBand',
    'commissionedDate', 'commissionedDate3G'];
  newColumns: string[] = ['bsc'];
  insert: number;
  update: number;
  public dataSource = new MatTableDataSource<SiteDetails>();

  /*title = 'Browser market shares at a specific website, 2014';
  type = 'PieChart';
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Browser', 'Percentage'];
  options = {
  };*/
  title = 'Site changes for the year (2019)';
  type = 'BarChart';
  data = [
    ['Added', this.insert],
    ['Updated', this.update],
  ];
  columnNames = ['Year', 'Hutch'];
  options = {
    colors: ['#ffa726']
  };
  width = 550;
  height = 300;

  oTitle = 'Site Ownership Report';
  oType = 'PieChart';
  oData = [];
  oColumnNames = ['Year', 'Hutch'];
  oWidth = 550;
  oHeight = 300;
  counts: Count[];

  titleT = 'Site Tower Type Report';
  typeT = 'PieChart';
  dataT = [];
  columnNamesT = ['Year', 'Hutch'];
  widthT = 550;
  heightT = 300;
  countsT: CountT[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private siteDetailsService: SiteDetailsService, private datePipe: DatePipe, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.post('http://localhost:8080/SiteDetails' + '/' + 'Count/Inserted', {
      startDate: '27-09-2019',
      endDate: '30-10-2019'} ).toPromise().then((data: any) => {
      this.insert = data;
      this.data = [
        ['Added', this.insert],
        ['Updated', this.update],
      ];
    });
    this.http.post('http://localhost:8080/SiteDetails' + '/' + 'Count/Updated', {
      startDate: '27-09-2019',
      endDate: '30-10-2019'} ).toPromise().then((data: any) => {
      this.update = data;
      this.data = [
        ['Added', this.insert],
        ['Updated', this.update],
      ];
    });
    this.http.get<Count[]>('http://localhost:8080/SiteDetails' + '/' + 'Count/Owner').subscribe(data => {
      this.counts = data;
      for (let counter = 0; counter < this.counts.length; counter++) {
        this.oData[counter] = [this.counts[counter].ownership, this.counts[counter].count];
      }
    });
    this.http.get<CountT[]>('http://localhost:8080/SiteDetails' + '/' + 'Count/TT').subscribe(data => {
      this.countsT = data;
      for (let counter = 0; counter < this.countsT.length; counter++) {
        this.dataT[counter] = [this.countsT[counter].tower_type, this.countsT[counter].count];
      }
    });
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
    console.log(this.insert);
  }

  dateeeee() {
    console.log('inside');
    this.siteDetailsService.getUpdateCount();
  }
  print(): void {
    let printContents;
    let popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
