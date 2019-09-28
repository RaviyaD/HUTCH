import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ZoneServices} from '../zoneService';
import {Zone} from '../zone';
import {RegionServices} from '../regionService';


@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.css']
})
export class EditZoneComponent implements OnInit {
  cname: string;
  step = 0;
  zn: Zone;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private router: Router, private zoneservices: ZoneServices, private route: ActivatedRoute, public dataService: ZoneServices) {
    this.zn = new Zone();
  }

  ngOnInit() {
    this.cname = this.route.snapshot.params.cname;
    this.zoneservices.getzone().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].zonename === this.cname) {
          this.zn = data[i];
        }
      }
    });
  }

  submitUpdate() {
    this.dataService.updatezone(this.zn);
    console.log(this.zn.zonename);
  }
}
