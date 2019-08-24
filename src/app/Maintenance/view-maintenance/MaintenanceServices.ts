import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
    this.urld = 'http://localhost:8080/Maintenance/18';
  }

  public getMaintenance(): Observable<IMaintenance[]> {
    return this.http.get<IMaintenance[]>(this.url);
}

public addMaintenance(im: IMaintenance) {
    return this.http.post<IMaintenance>(this.url, im);
}

public deleteMaintenance(id: number) {
  console.log(this.urld);
  return this.http.delete('{this.urld)}');
}
  getDialogData() {
    return this.dialogData;
  }

  get data(): IMaintenance[] {
    return this.dataChange.value;
  }


}
