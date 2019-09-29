import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Remark} from '../model/remark';
import {RemarkServiceService} from '../service/remark-service.service';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.css']
})
export class RemarkDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemarkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Remark,
              public dataService: RemarkServiceService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  gotoRemarks() {
    this.router.navigate(['/remarks']);
    window.location.reload();
  }
  submitUpdateRemarks(): void {
    console.log(this.data.remark);
    console.log('iddddddddddddddd');
    this.dataService.updateRemarks(this.data);
    this.gotoRemarks();
  }
}
