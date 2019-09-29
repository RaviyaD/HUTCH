import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {IncidentService} from '../IncidentService';
import {Security} from '../Security';

@Component({
  selector: 'app-update-security',
  templateUrl: './update-security.component.html',
  styleUrls: ['./update-security.component.css']
})
export class UpdateSecurityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateSecurityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Security,
              private dataService: IncidentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  submitUpdate(): void {
    console.log(this.data.securityId);
    this.dataService.updateSecurity(this.data);
    this.gotoViewSecurity();
  }

  gotoViewSecurity() {
    this.router.navigate(['Security/view-site-security-person']);
    window.location.reload();
  }
}
