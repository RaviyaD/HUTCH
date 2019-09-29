import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IProject} from '../Project';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectServicesService} from '../view-ongoing-project/ProjectServices';

@Component({
  selector: 'app-update-ongoing-project',
  templateUrl: './update-ongoing-project.component.html',
  styleUrls: ['./update-ongoing-project.component.css']
})
export class UpdateOngoingProjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateOngoingProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IProject,
              private dataService: ProjectServicesService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
  }

  gotoViewProject() {
    this.router.navigate(['/add-new-project']);
    window.location.reload();
  }

  submitUpdate(): void {
    console.log(this.data.projectId);
    console.log('iddddddddddddddd');
    this.dataService.updateProject(this.data);
    this.gotoViewProject();
  }

}
