import {Component, OnInit, ViewChild} from '@angular/core';
import {ZoneServices} from '../zoneService';
import {Zone} from '../zone';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-view-region-zone',
  templateUrl: './view-region-zone.component.html',
  styleUrls: ['./view-region-zone.component.css']
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
}


