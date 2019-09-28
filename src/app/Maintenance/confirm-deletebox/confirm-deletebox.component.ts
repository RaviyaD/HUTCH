import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';

@Component({
  selector: 'app-confirm-deletebox',
  templateUrl: './confirm-deletebox.component.html',
  styleUrls: ['./confirm-deletebox.component.css']
})
export class ConfirmDeleteboxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data, public dialogRef: MatDialogRef<ConfirmDeleteboxComponent>, public maintenanceservice: MaintenanceServicesService) { }

  ngOnInit() {
  }

 closeDialog() {
    this.dialogRef.close(false);
 }
}
