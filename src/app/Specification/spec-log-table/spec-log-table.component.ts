import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {SpecLog} from '../model/spec-log';
import {SpLogService} from '../service/sp-log.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-spec-log-table',
  templateUrl: './spec-log-table.component.html',
  styleUrls: ['./spec-log-table.component.css']
})
export class SpecLogTableComponent implements OnInit {


  @ViewChild('SlogForm', {static: false}) form: NgForm;
  specl: SpecLog;
  routerParam: string;
  // temp: SpecLog = {specId: null, remark: null};

  constructor(private spl: SpLogService, private route: ActivatedRoute, private router: Router) {
    this.specl = new SpecLog();
  }

  ngOnInit() {

  }

  onSubmit(buttonType) {
    this.spl.save(this.specl).subscribe(result => this.gotoSLogList());
    window.location.reload();
  }

  gotoSLogList() {
    this.router.navigate(['/specs']);
  }

}



