import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Incident} from './Incident';

@Injectable()
export class IncidentService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Incident';
  }

  public getIncident(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.url);
  }

  public addincident(inn: Incident) {
    return this.http.post<Incident>(this.url, inn);
  }
}
