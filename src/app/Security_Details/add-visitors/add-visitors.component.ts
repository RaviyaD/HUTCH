import { Component, NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-add-visitors',
  templateUrl: './add-visitors.component.html',
  styleUrls: ['./add-visitors.component.css']
})
@NgModule({
    declarations: [
      AppComponent,
      AddVisitorsComponent
    ],
  imports: [

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]

})


export class AddVisitorsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  log(x) { console.log(x); }

}

