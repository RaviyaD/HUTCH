import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SpecLog} from '../model/spec-log';


@Injectable()
export class SpLogService {

  private slogUrl: string;

  constructor(private http: HttpClient) {
    this.slogUrl = 'http://localhost:8080/Spec';
  }
  public findAll(): Observable<SpecLog[]> {
    return this.http.get<SpecLog[]>(this.slogUrl);
  }

  public save(specl: SpecLog) {
    console.log('serviceb');
    return this.http.post<SpecLog>(this.slogUrl, specl);
    console.log('after l');
  }

  public deleteLog(specId: string): void {
    console.log('Delete function');
    this.http.delete(this.slogUrl + '/' + specId)
      .subscribe(data => {console.log('deleted');
                          console.log('error');
    },
        (err: HttpErrorResponse) => {
        console.log('error');
        });

      }
}
