import {Component, NgModule, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-site-security-person',
  templateUrl: './add-site-security-person.component.html',
  styleUrls: ['./add-site-security-person.component.css']
})

@NgModule({

  declarations: [
    AppComponent,
    AddSiteSecurityPersonComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule
  ]

})
export class AddSiteSecurityPersonComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
