import {Component, OnInit, ViewChild} from '@angular/core';
import {SpecLog} from '../model/spec-log';
import {SpLogService} from '../service/sp-log.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, NgForm} from '@angular/forms';
import {SiteDetails} from '../../site-management/site-details';
import {IProject} from '../../OngoingProject/Project';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {ProjectServicesService} from '../../OngoingProject/view-ongoing-project/ProjectServices';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-spec-log-table',
  templateUrl: './spec-log-table.component.html',
  styleUrls: ['./spec-log-table.component.css']
})
export class SpecLogTableComponent implements OnInit {

  @ViewChild('SlogForm', {static: false}) form: NgForm;
  temp: SpecLog;
  specList: SpecLog [];
  specl: SpecLog;
  ELEMENT_DATA: SpecLog[];
  displayedColumns: string[] = ['specId', 'siteId', 'projectId', 'remark', 'actions'];
  dataSource = this.ELEMENT_DATA;
  // FOR DB RETRIEVAL
  myControl = new FormControl();
  myControl1 = new FormControl();
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  Sites: SiteDetails[];
  projects: IProject[];
  siteid: string[] = [];
  projectId: string[] = [];

  constructor(private spl: SpLogService,  private siteDetailsService: SiteDetailsService, private projectServices: ProjectServicesService , private route: ActivatedRoute, private router: Router) {
    this.specl = new SpecLog();

    this.siteDetailsService.findAll().subscribe(data => {
      this.Sites = data;
      for (let counter = 0; counter < this.Sites.length; counter++) {
        this.siteid[counter] = this.Sites[counter].siteID;
      }

    });
    this.projectServices.getProject().subscribe(data => {
      this.projects = data;
      for (let counter = 0; counter < this.projects.length; counter++) {
        this.projectId[counter] = this.projects[counter].projectId;
      }
    });
  }

  ngOnInit() {
    this.getLog();
    this.specl = new SpecLog();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions2 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.siteid.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter1(value: any) {
    const filterValue = value.toLowerCase();
    return this.projectId.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    console.log('sub');
    this.spl.save(this.specl).subscribe(result =>
      this.getLog() );
    this.specl = new SpecLog();
  }


  private getLog() {
    this.spl.findAll().subscribe(data => {
      this.specList = data;
      this.ELEMENT_DATA = data;
      this.dataSource = data;
    });
  }

  onUpdate(id, specUp) {
    this.spl.update(id, specUp).subscribe(result =>
      this.getLog() );
    this.specl = new SpecLog();

  }

  viewSpec(id) {
    this.spl.getSpecById(id).subscribe(data => {
      this.specl = data;
    });
  }

  deleteSpec(id) {
    this.spl.deleteSpecById(id);
    setTimeout(() => {
      this.getLog();
    }, 2000);
  }
  /*  goToSpecItem() {
      this.router.navigate(['/uploadRes']);

    }*/
  gotoSLogList() {
    this.router.navigate(['/specs']);
  }
}



