import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {IMaintenance} from '../Maintenance';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';
import {ActivatedRoute, Router} from '@angular/router';
import {IContractors} from '../Contractors/IContractors';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-resolve-maintenance',
  templateUrl: './resolve-maintenance.component.html',
  styleUrls: ['./resolve-maintenance.component.css']
})
export class ResolveMaintenanceComponent implements OnInit {

  optionscontractornames: string[] = [];
  contractor: IContractors[];
  error: any = {isError: false, errorMessage: ''};
  isValidDate: any;

  constructor(public dialogRef: MatDialogRef<ResolveMaintenanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMaintenance,
              private dataService: MaintenanceServicesService, private route: ActivatedRoute, private router: Router, public datePipe: DatePipe,
              private snackBar: MatSnackBar) {
    this.dataService.getConstructors().subscribe(data1 => {
      this.contractor = data1;
      for (let count = 0; count < this.contractor.length; count++) {
        this.optionscontractornames[count] = this.contractor[count].cname;
      }
    });
  }

  ngOnInit() {
  }

  gotoViewMaintenance() {
   this.router.navigate(['/add-maintenance']);
   window.location.reload();
  }

  submitUpdate(): void {

    this.data.rdate = this.datePipe.transform(this.data.rdate, 'yyyy-MM-dd');
    this.data.idate = this.datePipe.transform(this.data.idate, 'yyyy-MM-dd');
    this.isValidDate = this.validateDates(this.data.idate, this.data.rdate);
    if (this.isValidDate) {
      if (this.data.cost != null) {
        if (this.data.conname != null) {
          this.data.status = 'In-Progressing';
          this.dataService.updateMaintenance(this.data);
          this.gotoViewMaintenance();
        } else {
          this.openSnackBar('Enter Valid Contractor Name');
        }
      } else {
        this.openSnackBar('Enter Cost');
      }

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
