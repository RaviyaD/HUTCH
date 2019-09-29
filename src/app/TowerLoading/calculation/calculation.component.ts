import {Component, OnInit} from '@angular/core';
import {SiteDetailsService} from '../../site-management/site-details.service';
import {SiteDetails} from '../../site-management/site-details';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {
  sites: SiteDetails[] = [];
  siteTowerHeight: string[] = [];
  options: string[] = [];
  ID: string;
  Ms: number;
  Mz: number;
  height: number;


  constructor(private siteDetailsService: SiteDetailsService) {
    this.Ms = 0;
    this.Mz = 0;
    this.height = 0;

  }

  ngOnInit() {
  }

  GetMT() {
    return (1 + (this.height * (this.Ms - 1 / 4 * 315.25) / (3.5 * (this.Mz + 315.25))));
  }

}
