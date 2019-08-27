import { Component, OnInit } from '@angular/core';
import {OwnedService} from './Owned.service';
import {OwnedDataSource} from './OwnedDataSource';
import {TowerService} from '../physcial-measurement/Tower.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AddusageComponent} from '../addusage/addusage.component';
import {IOwned} from './Owned';
import {EditusageComponent} from '../editusage/editusage.component';

@Component({
  selector: 'app-owned-towers',
  templateUrl: './owned-towers.component.html',
  styleUrls: ['./owned-towers.component.css']
})
export class OwnedTowersComponent implements OnInit {

  public OwnedTower = [];
  dataSource: OwnedDataSource;
  displayColumns = ['siteID', 'totalArea', 'windSheildArea', 'ownMicro', 'ownGSM',
    'totalSharedGSM', 'totalSharedMicro', 'remaining', 'actions'];
  id: string;
  exampleDatabase: TowerService | null;
  ot: IOwned;

  constructor(private OS: OwnedService, public dialog: MatDialog) { }

  public ds = new MatTableDataSource<IOwned>();
  ngOnInit() {
    this.dataSource = new OwnedDataSource(this.OS);
    this.dataSource.loadOwned();
    this.OS.getOwnedTowers()
      .subscribe(data => this.ds.data = data as IOwned[] );
  }

  startEdit(siteID: string, totalArea: number, windSheildArea: number, ownMicro: number,
            ownGSM: number, totalSharedMicro: number, totalSharedGSM: number, remaining: number) {
    this.id = siteID;
    // this.index = i;
    console.log(this.id);
    const dialogRef = this.dialog.open(EditusageComponent, {
      data: {
        siteID: siteID,
        totalArea: totalArea,
        windSheildArea: windSheildArea,
        ownMicro: ownMicro,
        ownGSM: ownGSM,
        totalSharedMicro: totalSharedMicro,
        totalSharedGSM: totalSharedGSM,
        remaining: remaining

      }, autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.datachange.value.findIndex(x => x.siteID === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.datachange.value[foundIndex] = this.OS.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });



  }

  delete(sid: string) {
    console.log(sid);
    this.OS.deleteOwnedTower(sid);
    this.ngOnInit();
  }

  gotoadd() {
    const dialogRef = this.dialog.open(AddusageComponent, {
      autoFocus: false,
        maxHeight: '90vh'
    });
  }

}
