import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Spec } from '../model/spec';
import {Observable, of} from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable()
export class UserServiceService {
  private specUrl: string;

  private basePath = '/uploads';
  uploads: AngularFireList<Spec[]>;

  constructor(private http: HttpClient) {
    this.specUrl = 'http://localhost:8080/SpecUpload';
  }

  public findAll(): Observable<Spec[]> {
    return this.http.get<Spec[]>(this.specUrl);
  }

  public getSpecById(id): Observable<Spec> {
    return this.http.get<Spec>(this.specUrl + '/' + id);
  }

  public deleteSpecById(specId): void {
    console.log('Delete function');
    this.http.delete(this.specUrl + '/' + specId)
      .subscribe(data => {
          console.log('deleted');
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

/*  // file upload method

  pushUpload(upload: Spec) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Spec) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Spec) {
    this.deleteFileData(upload.key)
      .then( () => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => {
        return console.log(error);
      });
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }*/

}
