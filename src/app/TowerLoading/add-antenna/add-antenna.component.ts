import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITower} from '../physical-measurement/Tower';
import {TowerService} from '../physical-measurement/Tower.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-antenna',
  templateUrl: './add-antenna.component.html',
  styleUrls: ['./add-antenna.component.css']
})
export class AddAntennaComponent implements OnInit {
  at: ITower;
  myControl = new FormControl();
  options: string[] = ['COL001', 'COL020', 'NEG011'];
  filteredOptions: Observable<string[]>;
  AddAntennaForm: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router, private ts: TowerService) {
    this.at = new ITower();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.AddAntennaForm = new FormGroup({
      siteID: new FormControl(null, Validators.required),
      height: new FormControl(null, [Validators.required, this.HeightLimit]),
      diameter: new FormControl(null, Validators.required),
      azimuth: new FormControl(null, Validators.required),
      oppositeSite: new FormControl(null, Validators.required),

    });
  }

  // auto complete part
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options. filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    console.log(this.AddAntennaForm);
    // this.ts.addTower(this.at).subscribe(result => this.gotoOwnedTowers());
    this.GenerateEmail();
  }

  gotoOwnedTowers() {
    this.router.navigate(['/physical-measurment']);
  }

  HeightLimit(control: FormControl): {[s: string]: boolean} {
    if ( !(10 <= control.value && control.value <= 20)) {
      return {limit: true};
    }
    return null;
  }

  GenerateReport() {
    console.log('Report');
  }

  GenerateEmail() {
    console.log('Email');

  }
}



