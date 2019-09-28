import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SiteDetails} from './site-details';

@Injectable({
  providedIn: 'root'
})
export class SiteDetailsService {

  private sitesUrl: string;
  dat = -99;
  dat1 = -99;

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
    return this.http.put<SiteDetails>(this.sitesUrl + '/' + siteID, site);
  }

  public deleteSite(siteID: string) {
    return this.http.delete(this.sitesUrl + '/' + siteID).subscribe( data => {
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  public getInsertCount() {
    console.log('inisde3');
    this.http.post(this.sitesUrl + '/' + 'Count/Inserted', {
      startDate: '27-09-2019',
      endDate: '30-09-2019'} ).toPromise().then((data: any) => {
      console.log(data);
      this.dat1 = Number(JSON.stringify(data.json));
      console.log(this.dat1);
    });
    // while (this.dat1 === -99) {}
  }

  public getUpdateCount() {
    console.log('inisde2');
    this.http.post(this.sitesUrl + '/' + 'Count/Updated', {
      startDate: '27-09-2019',
      endDate: '30-09-2019'} ).toPromise().then((data: any) => {
        console.log(data);
        this.dat = Number(JSON.stringify(data.json));
        console.log(this.dat);
    });
    // while (this.dat === -99) {}
    return this.dat;
  }
}
