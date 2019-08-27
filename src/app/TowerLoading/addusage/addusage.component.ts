import { Component, OnInit } from '@angular/core';
import {IOwned} from '../owned-towers/Owned';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnedService} from '../owned-towers/Owned.service';

@Component({
  selector: 'app-addusage',
  templateUrl: './addusage.component.html',
  styleUrls: ['./addusage.component.css']
})
export class AddusageComponent implements OnInit {
  ot: IOwned;

  constructor(private route: ActivatedRoute, private router: Router, private os: OwnedService) {
    this.ot = new IOwned();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.ot.totalArea);
    this.os.addOwnedTower(this.ot).subscribe(result => this.gotoOwnedTowers());
  }

  gotoOwnedTowers() {
    this.router.navigate(['/owned-towers']);
  }

}
