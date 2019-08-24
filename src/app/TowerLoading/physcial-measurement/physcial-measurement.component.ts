import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-physcial-measurement',
  templateUrl: './physcial-measurement.component.html',
  styleUrls: ['./physcial-measurement.component.css']
})
export class PhyscialMeasurementComponent implements OnInit {

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
  constructor() { }

  ngOnInit() {
  }

}
