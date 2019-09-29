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
import {UserServiceService} from '../service/user-service.service';
import {Spec} from '../model/spec';
import {MatSnackBar} from '@angular/material';
import * as jsPDF from 'jspdf';

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
  myControl2 = new FormControl();
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  Sites: SiteDetails[];
  projects: IProject[];
  spec: Spec[];
  siteid: string[] = [];
  projectId: string[] = [];
  specId: string [] = [];

  public specs = [];

  constructor(private spl: SpLogService, private snackBar: MatSnackBar, private specserve: UserServiceService, private siteDetailsService: SiteDetailsService, private projectServices: ProjectServicesService , private route: ActivatedRoute, private router: Router) {
    this.specl = new SpecLog();
    this.specserve.findAll().subscribe(data => {
      this.spec = data;
      for (let counter = 0; counter < this.spec.length; counter++) {
        this.specId[counter] = String(this.spec[counter].specId);
      }
      });
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
    this.filteredOptions3 = this.myControl2.valueChanges.pipe( startWith(''),
      map(value => this._filter2(value))
    );
  }
  private _filter2(value: any) {
    const filterValue = value.toLowerCase();
    return this.specId.filter(option => option.toLowerCase().includes(filterValue));
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
    this.openSnackBar('Log added successfully!!');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
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
    this.openSnackBar('Log updated successfully!!');

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
    this.openSnackBar('Log deleted successfully!!');
  }
  /*  goToSpecItem() {
      this.router.navigate(['/uploadRes']);

    }*/
  gotoSLogList() {
    this.router.navigate(['/specs']);
  }

  GenerateReport() {

    let row: any[] = [];
    const rowD: any[] = [];
    const col = ['Site ID', 'Project ID', 'Specification ID', 'Remark']; // initialization for headers
    const title = ' Report of Specification logs'; // title of report
    for  (let i = 0; i < this.specs.length; i++) {
      row.push(this.specs[i].siteId);
      row.push(this.specs[i].projectId);
      row.push(this.specs[i].specId);
      row.push(this.specs[i].remark);
      rowD.push(row);
      row = [];
    }


    this.getReport(col, rowD, title);
  }

  getReport(col: any[], rowD: any[], title: any) {
    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Specification Log', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('' + title, 435, 130).setFontSize(10);  //
    pdf.setLineWidth(1.5);
    pdf.line(5, 150, 995, 150);
    const pageContent = function (data) {
      // HEADER

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof pdf.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      pdf.setFontSize(10);
      const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
      pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
    };
    // pdf.autoTable(col, rowD,
    //  {
    //     addPageContent: pageContent,
    //     margin: {top: 160},
    //   });

    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');

  }

  getreporttoeach(specId, siteId, projectId, remark) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 480, 50).setFontSize(30);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Specification', 430, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Specification ID: ' + specId, 435, 130).setFontSize(10);  //
    pdf.setLineWidth(1.5);

    pdf.text('Site ID              :' + siteId, 140, 190).setFontSize(14);
    pdf.text('Project              :' + projectId, 140, 210).setFontSize(14);
    pdf.text('Spec ID              :' + specId, 140, 230).setFontSize(14);
    pdf.text('Remarks              :' + remark, 140, 250).setFontSize(14);

    pdf.line(5, 150, 995, 150);
    const pageContent = function (data) {
      // HEADER

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof pdf.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      pdf.setFontSize(10);
      const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
      pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
    };


    // for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save('Specification' + specId + '.pdf');

  }

}



