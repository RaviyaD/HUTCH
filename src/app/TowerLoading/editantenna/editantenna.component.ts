import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ITower} from '../physical-measurement/Tower';
import {TowerService} from '../physical-measurement/Tower.service';

@Component({
  selector: 'app-editantenna',
  templateUrl: './editantenna.component.html',
  styleUrls: ['./editantenna.component.css']
})
export class EditantennaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditantennaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITower,
              public dataService: TowerService) {
  }

  ngOnInit() {
  }

  submitUpdate() {
    this.dataService.updateTower(this.data);
  }

  ValidateAll() {
    return !(this.validateArea() && this.validateAzimuth() && this.validateDiameter() && this.validateHeight());
  }

  validateHeight() {
    return (this.data.height > 5 && this.data.height < 15);
  }

  validateDiameter() {
    return (this.data.diameter > 0.5 && this.data.diameter < 5);
  }

  validateArea() {
    return (this.data.diameter > 2 && this.data.diameter < 15);

  }

  validateAzimuth() {
    return (this.data.diameter > 0 && this.data.diameter <= 360);
  }


  GenerateEmail() {
    console.log('Email');

  }


}
