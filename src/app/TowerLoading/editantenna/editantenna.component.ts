import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ITower} from '../physcial-measurement/Tower';
import {TowerService} from '../physcial-measurement/Tower.service';

@Component({
  selector: 'app-editantenna',
  templateUrl: './editantenna.component.html',
  styleUrls: ['./editantenna.component.css']
})
export class EditantennaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditantennaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITower,
              public dataService: TowerService) { }

  ngOnInit() {
  }

  submitUpdate() {
    this.dataService.updateTower(this.data);
    console.log('updateeeeed');
  }

}
