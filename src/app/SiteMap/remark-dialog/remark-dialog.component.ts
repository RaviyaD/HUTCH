import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Remark} from '../model/remark';
import {RemarkServiceService} from '../service/remark-service.service';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.css']
})
export class RemarkDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemarkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Remark,
              public dataService: RemarkServiceService) { }
  method: string[] = ['In-House', 'By-Contractor'];

  ngOnInit() {
  }

}


export class RemarkDataSource extends DataSource<any> {
  constructor(private remarkService: RemarkServiceService) {
    super();
  }
  connect(): Observable<Remark[]> {
    return this.remarkService.getRemark();
  }
  disconnect() {}
}
