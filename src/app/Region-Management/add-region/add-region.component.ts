import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Zone} from '../zone';
import {ZoneServices} from '../zoneService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css']
})
export class AddRegionComponent implements OnInit {
  constructor(private zoneService: ZoneServices) { }
  step = 0;
  @ViewChild('f', {static: false}) siteForm: NgForm;
  insert: Zone = { zonename: null, seniorengineer: null, semobno: null, seemail: null, engineer: null, emobno: null, eemail: null};

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
  }
  onSubmit() {
    this.insert.zonename = this.siteForm.value.zonename;
    this.insert.seniorengineer = this.siteForm.value.seniorengineer;
    this.insert.semobno = this.siteForm.value.semobno;
    this.insert.seemail = this.siteForm.value.seemail;
    this.insert.engineer = this.siteForm.value.engineer;
    this.insert.emobno = this.siteForm.value.emobno;
    console.log(this.insert.eemail);
    this.insert.eemail = this.siteForm.value.eemail;
    this.zoneService.addzone(this.insert).subscribe();
  }
}



