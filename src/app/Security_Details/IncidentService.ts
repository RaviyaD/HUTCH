import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Incident} from './Incident';
import {Security} from './Security';
import {Visitors} from './Visitors';
import {IProject} from '../OngoingProject/Project';

@Injectable()
export class IncidentService {

  private url: string;
  private url2: string;
  private url3: string;

  dataChange: BehaviorSubject<Visitors[]> = new BehaviorSubject<Visitors[]>([]);

  dialogData: any;


  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Incident';
    this.url2 = 'http://localhost:8080/visitors';
    this.url3 = 'http://localhost:8080/security';

  }

  public getIncident(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.url);
  }

  public addincident(inn: Incident) {
    return this.http.post<Incident>(this.url, inn);
  }

  public delete(id: number): void {
    this.http.delete(this.url + '/' + id ).subscribe(data => {console.log('Record Deleted');

      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('error');
      }
    );
  }

  public getVisitors(): Observable<Visitors[]> {
    return this.http.get<Visitors[]>(this.url2);
  }
  public addVisitors(inn: Visitors) {

    return this.http.post<Visitors>(this.url2, inn);
  }

  public deleteVisitors(id: number): void {
    this.http.delete(this.url2 + '/' + id ).subscribe(data => {console.log('Record Deleted');

      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('error');
      }
    );
  }

  updateVisitors(vi: Visitors): void {
    this.http.put(this.url + '/' + vi.visitorId, vi).subscribe(data => {
        this.dialogData = vi;
        console.log('Hari bn Update una');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  public getSecurity(): Observable<Security[]> {
    return this.http.get<Security[]>(this.url3);
  }
  public addSecurity(inn: Security) {
    return this.http.post<Security>(this.url3, inn);
  }
  public deleteSecurity(id: number): void {
    this.http.delete(this.url3 + '/' + id ).subscribe(data => {console.log('Record Deleted');

      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('error');
      }
    );
  }

  getDialogData() {
    return this.dialogData;
  }
  get data(): Visitors[] {
    return this.dataChange.value;
  }

}
