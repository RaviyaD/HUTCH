import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IProject} from '../Project';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ProjectServicesService {

  private url: string;
  private urldel: string;
  dataChange: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);
  dialogData: any;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/Project';
    this.urldel = 'http://localhost:8080/Project/P001';
  }

  public getProject(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.url);
  }

  public addProject(im: IProject) {
    return this.http.post<IProject>(this.url, im);
  }

  public deleteProject(projectId: string): void {
    this.http.delete(this.url + '/' + projectId ).subscribe(data => [console.log('hari bn delete una')]);

  }

  updateProject(im: IProject): void {
    this.http.put(this.url + '/' + im.projectId, im).subscribe(data => {
        this.dialogData = im;
        console.log('Hari bn Update una');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  getDialogData() {
    return this.dialogData;
  }
  get data(): IProject[] {
    return this.dataChange.value;
  }

}
