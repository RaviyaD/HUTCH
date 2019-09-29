declare var require: any;
import {Component, OnInit} from '@angular/core';
import {TowerService} from './Tower.service';
import {TowerDataSource} from './TowerDataSource';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AddAntennaComponent} from '../add-antenna/add-antenna.component';
import {EditantennaComponent} from '../editantenna/editantenna.component';
import {ITower} from './Tower';
import {IOwned} from '../owned-towers/Owned';

const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-physical-measurement',
  templateUrl: './physical-measurement.component.html',
  styleUrls: ['./physical-measurement.component.css']
})
export class PhysicalMeasurementComponent implements OnInit {


  public Tower1 = [];
  public errorMsg;
  dataSource: TowerDataSource;
  displayedColumns = ['siteID', 'height', 'diameter', 'azimuth', 'area', 'TypeAntenna', 'ownership', 'oppositeSite', 'actions'];
  id: string;
  exampleDatabase: TowerService | null;
  at: ITower;
  var;
  series = {
    type: 'pie'
  };

  constructor(private TS: TowerService, public dialog: MatDialog) {
  }

  public ds = new MatTableDataSource<IOwned>();

  ngOnInit() {
    this.dataSource = new TowerDataSource(this.TS);
    this.dataSource.loadTower();
    this.TS.getTowers()
      .subscribe(data => this.Tower1 = data);
  }

  startEdit(siteID: string, towerID: number, diameter: number, height: number,
            azimuth: number, area: number, TypeAntenna: string, ownerShip: string, oppositeSite: string) {
    this.id = siteID;
    // this.index = i;
    console.log(this.id);
    const dialogRef = this.dialog.open(EditantennaComponent, {
      data: {
        siteID,
        towerID,
        diameter,
        height,
        azimuth,
        area,
        TypeAntenna,
        ownerShip,
        oppositeSite
      }, autoFocus: false,
      width: '80%',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.datachange.value.findIndex(x => x.siteID === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.datachange.value[foundIndex] = this.TS.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });


  }

  delete(sid: number) {
    console.log(sid);
    this.TS.deleteTower(sid);
    this.ngOnInit();
  }

  gotoadd() {
    const dialogRef = this.dialog.open(AddAntennaComponent, {
      width: '80%',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  GenerateReport() {
    /*
        let row: any[] = [];
        const rowD: any[] = [];
        const col = ['siteID', 'height', 'diameter', 'azimuth', 'oppositeSite']; // initialization for headers
        const title = 'Sample Report'; // title of report
        for (let a = 0; a < this.Tower1.length; a++) {
          row.push(this.Tower1[a].siteID);
          row.push(this.Tower1[a].height);
          row.push(this.Tower1[a].diameter);
          row.push(this.Tower1[a].azimuth);
          row.push(this.Tower1[a].oppositeSite);
          rowD.push(row);
          row = [];
        }
        this.getReport(col, rowD, title);
      }

      getReport(col: any[], rowD: any[], title: any) {
        const totalPagesExp = '{total_pages_count_string}';
        const pdf = new jsPDF('l', 'pt', 'legal');
        pdf.setTextColor(255, 69, 0);
        pdf.text('HUTCH', 480, 50).setFontSize(30);
        pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
        pdf.text('TOWER USAGE', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
        pdf.text('' + title, 435, 130).setFontSize(10);  //
        pdf.setLineWidth(1.5);
        pdf.line(5, 150, 995, 150);
        const pageContent = function (data) {
          // HEADER

          // FOOTER
          let str = 'Page ' + data.pageCount;
          // Total page number plugin only available in jspdf v1.0+
          if (typeof pdf.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp;
          }
          pdf.setFontSize(10);
          const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
          pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
        };
        pdf.autoTable(col, rowD,
          {
            addPageContent: pageContent,
            margin: {top: 160},
          });

        // for adding total number of pages // i.e 10 etc
        if (typeof pdf.putTotalPages === 'function') {
          pdf.putTotalPages(totalPagesExp);
        }

        pdf.save(title + '.pdf');
    */
  }

}
