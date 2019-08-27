import { Component, OnInit } from '@angular/core';
import {Remark} from '../model/remark';
import {RemarkServiceService} from '../service/remark-service.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {RemarkDialogComponent} from '../remark-dialog/remark-dialog.component';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  remarks: Remark[];
  re: Remark;
  ids: string;
  index: number;
  exampleDatabase: RemarkServiceService | null;

  constructor(private remarkService: RemarkServiceService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.remarkService.findAll().subscribe(data => {
      this.remarks = data;
    });
  }

  delete(id: string) {
    console.log(id);
    this.remarkService.delete(id);
    console.log('deleted');
    window.location.reload();
  }

  startEdit(ids: string , remark: string) {
    this.ids = ids;
    // this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(RemarkDialogComponent, {
      data: {id: ids , remark: remark}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.ids);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.remarkService.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }}
