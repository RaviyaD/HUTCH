import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Spec } from '../model/spec';
import {Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import {getMatIconNameNotFoundError} from '@angular/material';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable()
export class UserServiceService {

  private specUrl: string;
  constructor(private http: HttpClient) {
    this.specUrl = 'http://localhost:8080/SpecUpload' ;
  }
  public findAll(): Observable<Spec[]> {
    return this.http.get<Spec[]>(this.specUrl);
  }

  public getSpecById(id): Observable<Spec> {
    return this.http.get<Spec>(this.specUrl + '/' + id);
  }
  // public deleteSpecById(id): Observable<Spec> {
  //   return this.http.delete<Spec>(this.specUrl + '/' + id);
  // }
  public deleteSpecById(specId): void {
    console.log('Delete function');
    this.http.delete(this.specUrl +  specId)
      .subscribe(data => {console.log('deleted');
                          console.log('error');
        },
        (err: HttpErrorResponse) => {
          console.log('error');
        });

  }
  public save(spec: Spec) {
    console.log('insert');
    return this.http.post<Spec>(this.specUrl, spec);
    console.log('inserted');
  }

  public update(id, spec) {
    console.log(spec);
    return this.http.put<Spec>(this.specUrl + '/' + id, spec, httpOptions);
  }


  /*for PDF
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', '/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
    return this.http.get('/getallfiles'); }*/
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
