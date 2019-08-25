import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Site} from './site';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {

  private sitesUrl: string;

  constructor(private http: HttpClient) {
    this.sitesUrl = 'http://localhost:8080/Site1';
  }

  public findAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.sitesUrl);
  }

  public getSiteByID(id: string): Observable<Site> {
    return this.http.get<Site>(this.sitesUrl + '/' + id);
  }

  public save(site: Site) {
    return this.http.post<Site>(this.sitesUrl, site);
  }
}
