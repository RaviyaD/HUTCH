import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Region} from '../region';
import {RegionServices} from '../regionService';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-subregion',
  templateUrl: './add-subregion.component.html',
  styleUrls: ['./add-subregion.component.css']
})
export class AddSubregionComponent implements OnInit {

  constructor(private regionService: RegionServices, private router: Router) { }

  step = 0;
  @ViewChild('f', {static: false}) siteForm: NgForm;
  insert: Region = { regionname: null, zonename: null, technicalofficer: null, tomobno: null, toemail: null};

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
    this.insert.regionname = this.siteForm.value.regionname;
    this.insert.zonename = this.siteForm.value.zonename;
    this.insert.technicalofficer = this.siteForm.value.technicalofficer;
    this.insert.tomobno = this.siteForm.value.tomobno;
    this.insert.toemail = this.siteForm.value.toemail;
    this.regionService.addregion(this.insert).subscribe(resule => this.gotoviewr());
  }
  gotoviewr() {
    this.router.navigate(['/Region/view-region']);
  }
}
