import { Component, OnInit } from '@angular/core';
import {SpLogService} from '../service/sp-log.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpecLog} from '../model/spec-log';

@Component({
  selector: 'app-spec-log-in',
  templateUrl: './spec-log-in.component.html',
  styleUrls: ['./spec-log-in.component.css']
})
export class SpecLogInComponent implements OnInit {
  ngOnInit(): void {
  }
 /* specs: SpecLog[];

  constructor(private spl: SpLogService,  private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.spl.findAll().subscribe(data => {
      this.specs = data;
    });
  }

  delete(specId: string) {
    console.log(specId);
    this.spl.deleteLog(specId);
    window.location.reload();
  }

  update() {


  }*/
}
