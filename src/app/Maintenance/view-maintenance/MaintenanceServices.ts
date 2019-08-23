import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IMaintenance} from '../Maintenance';
import { Observable} from 'rxjs';

@Injectable()
export class MaintenanceServicesService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Maintenance';
  }

  public getMaintenance(): Observable<IMaintenance[]> {
    return this.http.get<IMaintenance[]>(this.url);
}

public addMaintenance(im: IMaintenance) {
    return this.http.post<IMaintenance>(this.url, im);
}
}
