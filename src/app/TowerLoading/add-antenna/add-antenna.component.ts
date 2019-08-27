import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITower} from '../physcial-measurement/Tower';
import {TowerService} from '../physcial-measurement/Tower.service';

@Component({
  selector: 'app-add-antenna',
  templateUrl: './add-antenna.component.html',
  styleUrls: ['./add-antenna.component.css']
})
export class AddAntennaComponent implements OnInit {
  at: ITower;


  constructor(private route: ActivatedRoute, private router: Router, private ts: TowerService) {
    this.at = new ITower();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.at.siteID);
    this.ts.addTower(this.at).subscribe(result => this.gotoOwnedTowers());
  }

  gotoOwnedTowers() {
    this.router.navigate(['/physical-measurment']);
  }



}
