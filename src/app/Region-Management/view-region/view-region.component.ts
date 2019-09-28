import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {RegionServices} from '../regionService';
import {Region} from '../region';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatPaginator, MatTableDataSource} from '@angular/material';
import {TowerService} from '../../TowerLoading/physical-measurement/Tower.service';
import {ZoneServices} from '../zoneService';
import {ITower} from '../../TowerLoading/physical-measurement/Tower';

@Component({
  selector: 'app-view-region',
  templateUrl: './view-region.component.html',
  styleUrls: ['./view-region.component.css']
})
export class ViewRegionComponent implements OnInit {
  constructor(private rr: RegionServices, private router: Router, private route: ActivatedRoute, public dataService: RegionServices) {
    this.re = new Region();
    this.re.zonename = null;
    this.rr.getregion().subscribe(data => {
      this.reg = data;
      for (let i = 0; i < this.reg.length; i++) {
        this.options[i] = this.reg[i].regionname;
      }
    });
  }

  options: string[] = [];
  filteredOptions: Observable<string[]>;
  reg: Region[];
  re: Region;
  j: number;
  step = 0;
  myControl = new FormControl();
  rname: string;
  public dataSource1 = new MatTableDataSource<Region>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
    //  this.rr.getregion().subscribe(data => this.region = data);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    if (this.rname !== null) {
    } else {
      this.re.zonename = ' Enter Name';
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public show(n: string) {
    if (this.j === -1) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i] === this.rname) {
          this.rr.getbuyname(n).subscribe(data => {
            this.re = data;
          });
        }
      }
    }
  }

  public validcomplete(key: string) {
    if (this.re.zonename === null) {
      for (let i = 0; i < this.options.length; i++) {

        if (key !== this.options[i]) {
          this.j = 0;
        } else {
          this.j = -1;
          this.rname = key;
          this.show(this.rname);
          break;
        }

      }
    }
    return this.j;

    this.dataSource1.paginator = this.paginator;
    this.rr.getregion()
      .subscribe(data => this.dataSource1.data = data as Region[]);
    //  this.dataSource1.data = Object.values(this.maintenance1);

    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {   // for refresh
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.dataSource1.paginator = this.paginator;
        this.rr.getregion()
          .subscribe(data => this.dataSource1.data = data as Region[]);
      }
    });
  }

  // noinspection JSAnnotator
  delete(regionname: string) {
    this.rr.deleteregion(regionname);
    this.router.navigate(['Region/view-region'], {     // for refresh
      queryParams: {refresh: new Date().getTime()}
    });
  }

  submitUpdate(im: Region) {
    this.dataService.updateregion(im);
    console.log('updateeeeed');
  }

  deleteregion(im: string) {
    console.log('llllllllll');
    this.dataService.deleteregion(im);
  }
}



