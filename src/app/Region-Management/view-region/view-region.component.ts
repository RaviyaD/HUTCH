import { Component, OnInit } from '@angular/core';
import {ZoneServices} from '../zoneService';

@Component({
  selector: 'app-view-region',
  templateUrl: './view-region.component.html',
  styleUrls: ['./view-region.component.css']
})
export class ViewRegionComponent implements OnInit {
  public zone = [];
  constructor(private zs: ZoneServices) { }

  ngOnInit() {
    this.zs.getzone().subscribe(data => this.zone = data);
  }

}
