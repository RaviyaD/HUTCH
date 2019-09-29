import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {SiteDetails} from '../../site-management/site-details';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})
export class SearchMapComponent implements OnInit {


  options: string[] = [];
  filteredOptions: Observable<string[]>;
  sites: SiteDetails[];
  searchMap: SiteDetails[];
  sname: string;
  siteName: SiteDetails;

  constructor(public fb: FormBuilder, private mapservice: SiteDetailsService, private router: Router,
              private siteDetailsService: SiteDetailsService) {

    this.mapservice.findAll().subscribe(data => {
      this.searchMap = data;
      for (let counter = 0; counter < this.searchMap.length; counter++) {
        this.options[counter] = this.searchMap[counter].siteName;
        console.log(this.options[counter]);
      }
    });
  }

  myControl = new FormControl();

  formControl = new FormControl('', [
    Validators.required
  ]);


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? ' *Please enter a valid site name' :
      '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    this.SearchInMap(this.sname);
  }

  SearchInMap(name: string) {
    this.router.navigate(['/siteMap/search-locations/', name]);
  }

  SearchDirection(name: string) {
    this.router.navigate(['/siteMap/directmap/', name]);
  }
}
