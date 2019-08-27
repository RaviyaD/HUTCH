import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Spec } from '../model/spec';
import { Observable } from 'rxjs';

@Injectable()
export class UserServiceService {

  private specUrl: string;

  constructor(private http: HttpClient) {
  this.specUrl = 'http://localhost:8080/SpecUpload' ;
    }
    public findAll(): Observable<Spec[]> {
    return this.http.get<Spec[]>(this.specUrl);
  }

  public save(spec: Spec) {
    console.log('insert');
    return this.http.post<Spec>(this.specUrl, spec);
    console.log('inserted');
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

}
