import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IContractors} from '../IContractors';
import {MaintenanceServicesService} from '../../view-maintenance/MaintenanceServices';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.css']
})
export class AddContractorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddContractorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IContractors,
              public maintenanceservice: MaintenanceServicesService) { }

formControl = new FormControl('', [
  Validators.required
]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
  }

  confirmAdd() {
    console.log('Addconfirm eka weda' + this.data.email)
    this.maintenanceservice.addContractors(this.data).subscribe( result => console.log('complete ptta'));
  }



}
