import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IProject} from '../Project';
import { Observable} from 'rxjs';

@Injectable()
export class ProjectServicesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Project';
  }

  public getProject(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.url);
  }

  public addProject(im: IProject) {
    return this.http.post<IProject>(this.url, im);
  }

}
