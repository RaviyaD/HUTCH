import { Component, OnInit } from '@angular/core';
import {TowerService} from './Tower.service';
import {TowerDataSource} from './TowerDataSource';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AddAntennaComponent} from '../add-antenna/add-antenna.component';
import {EditantennaComponent} from '../editantenna/editantenna.component';
import {ITower} from './Tower';
import {IOwned} from '../owned-towers/Owned';

@Component({
  selector: 'app-physical-measurement',
  templateUrl: './physical-measurement.component.html',
  styleUrls: ['./physical-measurement.component.css']
})
export class PhysicalMeasurementComponent implements OnInit {

  public Tower1 = [];
  public errorMsg;
  dataSource: TowerDataSource;
  displayedColumns = ['siteID', 'height', 'diameter', 'azimuth', 'oppositeSite', 'actions'];
  id: string;
  exampleDatabase: TowerService | null;
  at: ITower;

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
            azimuth: number, oppositeSite: number) {
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
        oppositeSite
      }, autoFocus: false,
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

  delete(sid: string) {
    console.log(sid);
    this.TS.deleteTower(sid);
    this.ngOnInit();
  }

  gotoadd() {
    const dialogRef = this.dialog.open(AddAntennaComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    });
  }
}
