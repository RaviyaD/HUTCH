import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SpecLog} from '../model/spec-log';
import {Spec} from '../model/spec';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class SpLogService {

  private slogUrl: string;

  constructor(private http: HttpClient) {
    this.slogUrl = 'http://localhost:8080/Spec';
  }
  public findAll(): Observable<SpecLog[]> {
    return this.http.get<SpecLog[]>(this.slogUrl);
  }

  public getSpecById(id): Observable<SpecLog> {
    return this.http.get<SpecLog>(this.slogUrl + '/' + id);
  }
  public deleteSpecById(specId): void {
    console.log('Delete function');
    this.http.delete(this.slogUrl + '/' + specId)
      .subscribe(data => {console.log('deleted');
                          console.log('error');
        },
        (err: HttpErrorResponse) => {
          console.log('error');
        });

  }
  public save(spec: SpecLog) {
    console.log('insert');
    return this.http.post<Spec>(this.slogUrl, spec);
    console.log('inserted');
  }

  public update(id, spec) {
    console.log(spec);
    return this.http.put<SpecLog>(this.slogUrl + '/' + id, spec, httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      //  Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
