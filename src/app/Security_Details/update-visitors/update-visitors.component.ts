import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IProject} from '../../OngoingProject/Project';
import {ProjectServicesService} from '../../OngoingProject/view-ongoing-project/ProjectServices';
import {ActivatedRoute, Router} from '@angular/router';
import {Visitors} from '../Visitors';
import {IncidentService} from '../IncidentService';

@Component({
  selector: 'app-update-visitors',
  templateUrl: './update-visitors.component.html',
  styleUrls: ['./update-visitors.component.css']
})
export class UpdateVisitorsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateVisitorsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Visitors,
              private dataService: IncidentService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
  }

  gotoViewProject() {
    this.router.navigate(['/add-visitors']);
    window.location.reload();
  }

  submitUpdate(): void {
    console.log(this.data.visitorId);
    console.log('iddddddddddddddd');
    this.dataService.updateVisitors(this.data);
    this.gotoViewProject();
  }
}
