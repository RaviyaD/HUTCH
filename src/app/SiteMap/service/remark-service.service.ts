import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Remark} from '../model/remark';

@Injectable({
  providedIn: 'root'
})
export class RemarkServiceService {

  private usersUrl: string;
  dataChange: BehaviorSubject<Remark[]> = new BehaviorSubject<Remark[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/MapRemark';
  }

  updateRemarks(rrr: Remark): void {
    this.http.put(this.usersUrl + '/' + rrr.id, rrr).subscribe(data => {
        this.dialogData = rrr;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }


  public findAll(): Observable<Remark[]> {
    return this.http.get<Remark[]>(this.usersUrl);
  }

  public save(remark: Remark) {
    return this.http.post<Remark>(this.usersUrl, remark);
  }

  public delete(id: string): void {
this.http.delete(this.usersUrl + '/' + id ).subscribe(data => {console.log('remark deleted');
} , (err: HttpErrorResponse) => {
  console.log('error');
}); }

  getDialogData() {
    return this.dialogData;
  }

  get data(): Remark[] {
    return this.dataChange.value;
  }

}
