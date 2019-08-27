import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IOwned} from '../owned-towers/Owned';
import {OwnedService} from '../owned-towers/Owned.service';

@Component({
  selector: 'app-editusage',
  templateUrl: './editusage.component.html',
  styleUrls: ['./editusage.component.css']
})
export class EditusageComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<EditusageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IOwned,
              public dataService: OwnedService) { }
  ngOnInit() {
  }

  submitupdate() {
    this.dataService.updateOwned(this.data);
    console.log('updateeeeed');
  }



}
