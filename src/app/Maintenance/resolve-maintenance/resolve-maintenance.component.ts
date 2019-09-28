import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IMaintenance} from '../Maintenance';
import {MaintenanceServicesService} from '../view-maintenance/MaintenanceServices';
import {ActivatedRoute, Router} from '@angular/router';
import {IContractors} from '../Contractors/IContractors';

@Component({
  selector: 'app-resolve-maintenance',
  templateUrl: './resolve-maintenance.component.html',
  styleUrls: ['./resolve-maintenance.component.css']
})
export class ResolveMaintenanceComponent implements OnInit {

  optionscontractornames: string[] = [];
  contractor: IContractors[];

  constructor(public dialogRef: MatDialogRef<ResolveMaintenanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMaintenance,
              private dataService: MaintenanceServicesService, private route: ActivatedRoute, private router: Router) {
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
    console.log(this.data.ids);
    console.log('iddddddddddddddd');
    this.data.status = 'In-Progressing';
    this.dataService.updateMaintenance(this.data);
    this.gotoViewMaintenance();
  }


}
