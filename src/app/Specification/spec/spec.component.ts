import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {Spec} from '../model/spec';
import {UserServiceService} from '../service/user-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-spec',
  templateUrl: './spec.component.html',
  styleUrls: ['./spec.component.css']
})
export class SpecComponent implements OnInit {

  uploadRes: Spec[];

  fileUploads: Observable<string[]>;

  constructor(public dialog: MatDialog, private upl1: UserServiceService) { }

  ngOnInit() {
    this.upl1.findAll().subscribe(data => {this.uploadRes = data; });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SpecComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
