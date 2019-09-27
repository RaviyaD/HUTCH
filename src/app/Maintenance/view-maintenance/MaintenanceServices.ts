import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IMaintenance} from '../Maintenance';
import {BehaviorSubject, Observable} from 'rxjs';
import {IContractors} from '../Contractors/IContractors';

@Injectable()
export class MaintenanceServicesService {

  private url: string;
  private urlConstractor: string;
  dataChange: BehaviorSubject<IMaintenance[]> = new BehaviorSubject<IMaintenance[]>([]);
  dataChangeCon: BehaviorSubject<IContractors[]> = new BehaviorSubject<IContractors[]>([]);
  dialogData: any;
  constructor(private http: HttpClient, private http1: HttpClient) {
    this.url = 'http://localhost:8080/Maintenance';
    this.urlConstractor = 'http://localhost:8080/Contractors';
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
        console.log(this.url + '/' + im.ids, im);
      },
      (err: HttpErrorResponse) => {
        console.log(err );
      }
    );
  }


   getDialogData() {
    return this.dialogData;
  }

   get data(): IMaintenance[] {
    return this.dataChange.value;
  }

   get dataCon(): IContractors[] {
    return this.dataChangeCon.value;
   }

  public getConstructors(): Observable<IContractors[]> {
    return this.http.get<IContractors[]>(this.urlConstractor);
  }

  public addContractors(cons: IContractors) {
    console.log('Addconfirm eka weda11' + cons.cname, this.urlConstractor);
    console.log(cons.cname);
    return this.http1.post<IContractors>(this.urlConstractor , cons);
  }

}
