import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IMaintenance} from '../Maintenance';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class MaintenanceServicesService {

  private url: string;
  private urld: string;
  dataChange: BehaviorSubject<IMaintenance[]> = new BehaviorSubject<IMaintenance[]>([]);
  dialogData: any;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Maintenance';

  }

  public getMaintenance(): Observable<IMaintenance[]> {
    return this.http.get<IMaintenance[]>(this.url);
}

  public addMaintenance(im: IMaintenance) {
    return this.http.post<IMaintenance>(this.url, im);
}

  public deleteMaintenance(id: number): void {
    this.http.delete(this.url + '/' + id ).subscribe(data => {console.log('Hari bn delete una');

      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('error');
      }
    );
  }

  updateMaintenance(im: IMaintenance): void {
    this.http.put(this.url + '/' + im.ids, im).subscribe(data => {
        this.dialogData = im;
        console.log('Hari bn Update una');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }




   getDialogData() {
    return this.dialogData;
  }

   get data(): IMaintenance[] {
    return this.dataChange.value;
  }




}
