import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Region} from './region';
import {IProject} from '../OngoingProject/Project';

@Injectable()
export class RegionServices {

  private url: string;
  private dialogData: any;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Region';
  }

  public getregion(): Observable<Region[]> {
    return this.http.get<Region[]>(this.url);
  }

  public getbuyname(regionname: string): Observable<Region> {
    return this.http.get<Region>(this.url + '/' + regionname);
}

  public addregion(im: Region) {
    console.log(im.regionname);
    return this.http.post<Region>(this.url, im);
  }

  public deleteregion(regionname: string): void {
    this.http.delete(this.url + '/' + regionname).subscribe(data => {
        console.log('Deleted');
      },
      (err: HttpErrorResponse) => {
        console.log('error');


      }
    );

  }
  updateregion(rr: Region): void {
    this.http.put(this.url + '/' + rr.regionname, rr).subscribe(data => {
        this.dialogData = rr;
        console.log('Updateeeeeed');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
