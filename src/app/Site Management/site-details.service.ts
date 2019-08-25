import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SiteDetails} from './site-details';

@Injectable({
  providedIn: 'root'
})
export class SiteDetailsService {

  private sitesUrl: string;

  constructor(private http: HttpClient) {
    this.sitesUrl = 'http://localhost:8080/SiteDetails';
  }

  public findAll(): Observable<SiteDetails[]> {
    return this.http.get<SiteDetails[]>(this.sitesUrl);
  }

  public getSiteByID(id: string): Observable<SiteDetails> {
    return this.http.get<SiteDetails>(this.sitesUrl + '/' + id);
  }

  public save(site: SiteDetails) {
    return this.http.post<SiteDetails>(this.sitesUrl, site);
  }

   updateSite(siteID: string, site: SiteDetails): Observable<SiteDetails> {
    console.log(siteID);
    console.log(site.commissionedDate);
    return this.http.put<SiteDetails>(this.sitesUrl + '/' + siteID, site);
  }

  public deleteSite(siteID: string) {
    console.log('inside service' + siteID);
    return this.http.delete(this.sitesUrl + '/' + siteID).subscribe( data => { console.log('deleted');
    },
      (err: HttpErrorResponse) => {
      console.log('error' + err );
    });
  }
}
