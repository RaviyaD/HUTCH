import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ITower} from './Tower';
import {BehaviorSubject, Observable} from 'rxjs';
import {Isort} from './sort';


@Injectable()
export class TowerService {

  private url = 'http://localhost:8080/Towers';
  datachange: BehaviorSubject<ITower[]> = new BehaviorSubject<ITower[]>([]);
  dialogdata: any;

  constructor(private http: HttpClient) {

  }

  public getTowers(): Observable<ITower[]> {
    return this.http.get<ITower[]>(this.url);
  }


  addTower(at: ITower) {
    console.log(at.oppositeSite);
    return this.http.post<ITower>(this.url, at);
  }

  public deleteTower(towerID: number) {
    console.log(this.url);
    return this.http.delete(this.url + '/' + towerID).subscribe(data => {

        console.log('hari bn  delete');
      },
      (err: HttpErrorResponse) => {
        console.log('kela uan' + towerID);
      }
    );
  }

  updateTower(ot: ITower) {
    this.http.put(this.url + '/' + ot.siteID, ot).subscribe(data => {
        this.dialogdata = ot;
        console.log('hari bn ela');
      },
      (err: HttpErrorResponse) => {
        console.log('kela uan');
      }
    );
  }

  getDialogData() {
    return this.dialogdata;
  }

  sort(siteID: string): Observable<Isort[]> {
    return this.http.get<Isort[]>(this.url + '/sort/' + siteID);
  }

  listbyID(siteID: string): Observable<Isort[]> {
    return this.http.get<Isort[]>(this.url + '/only/' + siteID);
  }


}
