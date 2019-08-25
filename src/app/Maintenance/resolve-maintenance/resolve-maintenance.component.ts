import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IMaintenance} from '../Maintenance';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';

@Component({
  selector: 'app-resolve-maintenance',
  templateUrl: './resolve-maintenance.component.html',
  styleUrls: ['./resolve-maintenance.component.css']
})
export class ResolveMaintenanceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResolveMaintenanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMaintenance,
              public dataService: MaintenanceServicesService) { }
  method: string[] = ['In-House', 'By-Contractor'];
  ngOnInit() {
  }

}
