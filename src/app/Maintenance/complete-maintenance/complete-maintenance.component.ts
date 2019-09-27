import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IMaintenance} from '../Maintenance';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-complete-maintenance',
  templateUrl: './complete-maintenance.component.html',
  styleUrls: ['./complete-maintenance.component.css']
})
export class CompleteMaintenanceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompleteMaintenanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMaintenance,
              private dataService: MaintenanceServicesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }


  gotoViewMaintenance() {
    this.router.navigate(['/add-maintenance']);
    window.location.reload();
  }

  submitUpdate(): void {
    console.log(this.data.ids);
    console.log('iddddddddddddddd');
    this.data.status = 'Complete';
    this.dataService.updateMaintenance(this.data);
    this.gotoViewMaintenance();
  }

}
