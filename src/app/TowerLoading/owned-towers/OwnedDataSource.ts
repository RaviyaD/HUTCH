import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {OwnedService} from './Owned.service';
import {IOwned} from './Owned';

export class OwnedDataSource implements DataSource<IOwned> {

  private OwnedObject = new BehaviorSubject<IOwned[]>([]);
  private LoadingObject = new BehaviorSubject<boolean>(false);

  public loading$ = this.LoadingObject.asObservable();

  constructor(private Ownedservice: OwnedService) {}

  connect(collectionViewer: CollectionViewer): Observable<IOwned[] | ReadonlyArray<IOwned>> {
    return this.OwnedObject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.OwnedObject.complete();
    this.LoadingObject.complete();
  }

  loadOwned() {
    this.LoadingObject.next(true);
    this.Ownedservice.getOwnedTowers().subscribe(Owned => this.OwnedObject.next(Owned));
  }


}
