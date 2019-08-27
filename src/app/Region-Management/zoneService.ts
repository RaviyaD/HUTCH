import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Zone} from './zone';

@Injectable()
export class ZoneServices {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Zone';
  }

  public getzone(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.url);
  }

  public addzone(im: Zone) {
    return this.http.post<Zone>(this.url, im);
  }

  public deletezone(zonename: string): void {
    this.http.delete(this.url + '/' + zonename).subscribe(data => {
        console.log('Deleted');
      },
      (err: HttpErrorResponse) => {
           console.log('error');


      }
    );

  }
}
