import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ProjectServicesService} from '../view-ongoing-project/ProjectServices';
import {IProject} from '../Project';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material';
import {Zone} from '../../Region-Management/zone';
import {ZoneServices} from '../../Region-Management/zoneService';
import {Region} from '../../Region-Management/region';
import {RegionServices} from '../../Region-Management/regionService';
import {Spec} from '../../Specification/model/spec';
import {UserServiceService} from '../../Specification/service/user-service.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  optionszonename: string[] = [];
  optionssubregion: string[] = [];
  optionsspec: string[] = [];

  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  zones: Zone[];
  subregion: Region[];
  specs: Spec[];
  is: IProject;
  type: string;
  datePipe: DatePipe;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectServicesService,
              private zoneService: ZoneServices, private regionService: RegionServices, private specService: UserServiceService,
              private snackBar: MatSnackBar) {
    this.is = new IProject();
    this.zoneService.getzone().subscribe(data => {
      this.zones = data;
      for (let counter = 0; counter < this.zones.length; counter++) {
        this.optionszonename[counter] = this.zones[counter].zonename;
      }
    });
    this.regionService.getregion().subscribe(data => {
      this.subregion = data;
      for (let counter = 0; counter < this.subregion.length; counter++) {
        this.optionssubregion[counter] = this.subregion[counter].regionname;
      }
    });
    this.specService.findAll().subscribe(data => {
      this.specs = data;
      for (let counter = 0; counter < this.specs.length; counter++) {
        console.log(this.specs[counter].specId);
        this.optionsspec[counter] = String(this.specs[counter].specId);
      }
    });
  }

  myControl = new FormControl();
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  formControl = new FormControl('', [
    Validators.required
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
        '';
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value1 => this.filter(value1))
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value2 => this.filter2(value2))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionszonename.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private filter(value1: string): string[] {
    const filterValue1 = value1.toLowerCase();
    return this.optionssubregion.filter(option1 => option1.toLowerCase().indexOf(filterValue1) === 0);
  }
  private filter2(value2: string): string[] {
    const filterValue2 = value2;
    return this.optionsspec.filter(option2 => option2.indexOf(filterValue2) === 0);
  }

  public  showzonename(name: string) {
    for (let i = 0; i < this.optionszonename.length; i++) {
      if (name === this.optionszonename[i]) {
        return this.optionszonename[i];
      }
    }
  }

  onSubmit() {
    console.log(this.is.projectId);
    this.projectService.addProject(this.is).subscribe(result => this.gotoViewProject());
  }
  gotoViewProject() {
    this.router.navigate(['Ongoing/view-ongoing-project']);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  displayregion(key: string) {

    let i = 0;
    if (key === 'SubRegion') {
      return i;
    } else if (key === undefined) {
      return i;
    } else {
      return ++i;
    }
  }
  displaysubregion(key: string) {

    let i = 0;
    if (key === 'Region') {
      return i;
    } else if (key === undefined) {
      return i;
    } else {
      return ++i;
    }
  }




}
