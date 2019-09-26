import {Component, OnInit} from '@angular/core';
import {OwnedService} from './Owned.service';
import {OwnedDataSource} from './OwnedDataSource';
import {TowerService} from '../physical-measurement/Tower.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AddusageComponent} from '../addusage/addusage.component';
import {IOwned} from './Owned';

@Component({
  selector: 'app-owned-towers',
  templateUrl: './owned-towers.component.html',
  styleUrls: ['./owned-towers.component.css']
})
export class OwnedTowersComponent implements OnInit {


  id: string;
  dataSource: OwnedDataSource;
  displayColumns = ['siteID', 'totalArea', 'windShieldArea', 'Micro', 'GSM',
    'remaining', 'actions'];
  exampleDatabase: TowerService | null;
  public ds = new MatTableDataSource<IOwned>();
  testid = 'raviya';

  constructor(private OS: OwnedService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataSource = new OwnedDataSource(this.OS);
    this.dataSource.loadOwned();
    this.OS.getOwnedTowers()
      .subscribe(data => this.ds.data = data as IOwned[]);
  }


  delete(sid: string) {
    console.log(sid);
    this.OS.deleteOwnedTower(sid);
    this.ngOnInit();
  }

  gotoadd() {
    const dialogRef = this.dialog.open(AddusageComponent, {
      width: '80%',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }


  getString() {
    return this.testid;
  }


}
