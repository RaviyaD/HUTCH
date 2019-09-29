import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {IMaintenance} from '../Maintenance';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-complete-maintenance',
  templateUrl: './complete-maintenance.component.html',
  styleUrls: ['./complete-maintenance.component.css']
})
export class CompleteMaintenanceComponent implements OnInit {

  error: any = {isError: false, errorMessage: ''};
  isValidDate: any;
  constructor(public dialogRef: MatDialogRef<CompleteMaintenanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMaintenance,
              private dataService: MaintenanceServicesService, private route: ActivatedRoute, private router: Router,
              public datePipe: DatePipe, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  gotoViewMaintenance() {
    this.router.navigate(['/add-maintenance']);
    window.location.reload();
  }

  submitUpdate(): void {
    this.data.rdate = this.datePipe.transform(this.data.rdate, 'yyyy-MM-dd');
    this.data.cdate = this.datePipe.transform(this.data.cdate, 'yyyy-MM-dd');
    this.isValidDate = this.validateDates(this.data.idate, this.data.rdate);
    console.log(this.data.rdate + this.data.cdate);
    if (this.isValidDate) {
      this.data.status = 'Complete';
      this.dataService.updateMaintenance(this.data);
      this.gotoViewMaintenance();
    } else {
      this.openSnackBar('Enter Valid Date');
    }
  }

  validateDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate == null || eDate == null)) {
      this.error = {isError: true, errorMessage: 'Start date and end date are required.'};
      this.isValidDate = false;
    }

    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      this.error = {isError: true, errorMessage: 'End date should be grater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
}
