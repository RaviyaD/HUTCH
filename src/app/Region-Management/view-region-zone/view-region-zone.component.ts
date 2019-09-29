import {Component, OnInit, ViewChild} from '@angular/core';
import {ZoneServices} from '../zoneService';
import {Zone} from '../zone';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as jsPDF from 'jspdf';
import {DatePipe} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-region-zone',
  templateUrl: './view-region-zone.component.html',
  styleUrls: ['./view-region-zone.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ViewRegionZoneComponent implements OnInit {
  public zone1 = [];
  constructor(private zoneservice: ZoneServices, private router: Router, private activatedRoute: ActivatedRoute) {}


  zone: Zone;
  displayedColumns: string[] = ['zonename', 'seengname', 'seengmobno', 'seengemail', 'engname', 'engmobno', 'engemail', 'action'];
  public dataSource1 = new MatTableDataSource<Zone>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {



    this.dataSource1.paginator = this.paginator;
    this.zoneservice.getzone()
      .subscribe(data => this.dataSource1.data = data as Zone[]);
    //  this.dataSource1.data = Object.values(this.maintenance1);

    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {   // for refresh
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.dataSource1.paginator = this.paginator;
        this.zoneservice.getzone()
          .subscribe(data => this.dataSource1.data = data as Zone[]);
      }
    });
  }
  // noinspection JSAnnotator
  delete(zonename: string) {
    this.zoneservice.deletezone(zonename);
    this.router.navigate(['Region/view-region-zone'], {     // for refresh
      queryParams: {refresh: new Date().getTime()}
    });
  }

  editzone(zonename: string) {
    // this.zoneservice.getzone().subscribe(data => this.dataSource1.data = data as Zone[]);
    this.router.navigate(['/Region/edit-zone', zonename]);
  }

  getreporttoeach(name, sename, semobile, semail, ename, emobile, eemail) {

    const totalPagesExp = '{total_pages_count_string}';
    const pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(255, 69, 0);
    pdf.text('HUTCH', 470, 50).setFontSize(20);
    pdf.text('Civil Department', 430, 80).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Region Management', 410, 100).setFontSize(20); // 450 here is x-axis and 80 is y-axis
    pdf.text('Zone Details: ' + name, 400, 130).setFontSize(20);  //
    pdf.setLineWidth(1.5);


    pdf.text('Zone Name          :' + name, 140, 190).setFontSize(12);
    pdf.text('Senior Engineer Name            :' + sename, 140, 210).setFontSize(12);
    pdf.text('Senior Engineer Mobile No     :' + semobile, 140, 230).setFontSize(12);
    pdf.text('Senior Engineer Email            :' + semail, 140, 250).setFontSize(12);
    pdf.text('Engineer Name                       :' + ename, 140, 270).setFontSize(12);
    pdf.text('Engineer mobile No                :' + emobile, 140, 290).setFontSize(12);
    pdf.text('Engineer Email                       :' + eemail, 140, 310).setFontSize(12);
    pdf.line(5, 150, 995, 150);
    const pageContent = function(data) {
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

    pdf.save('Zone' + name + '.pdf');

  }

}


