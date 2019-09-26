import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IOwned} from './Owned';


@Injectable()
export class OwnedService {

  private url = 'http://localhost:8080/TowersSpace';
  datachange: BehaviorSubject<IOwned[]> = new BehaviorSubject<IOwned[]>([]);
  dialogdata: any;

  constructor(private http: HttpClient) {

  }

  public getOwnedTowers(): Observable<IOwned[]> {
    return this.http.get<IOwned[]>(this.url);
  }

  public addOwnedTower(ot: IOwned) {
    return this.http.post<IOwned>(this.url, ot);
  }

   deleteOwnedTower(siteID: string) {
    console.log(this.url);
    return this.http.delete(this.url + '/' + siteID).subscribe(data => {

        console.log('hari bn  delete');
      },
      (err: HttpErrorResponse) => {
        console.log('kela uan');
      }
    );
  }

  updateOwned(ob: IOwned) {
    this.http.put(this.url + '/' + ob.siteID, ob).subscribe(data => {
      this.dialogdata = ob;
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
}
