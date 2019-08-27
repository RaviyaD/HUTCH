import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {TowerService} from './Tower.service';
import {ITower} from './Tower';

export class TowerDataSource implements DataSource<ITower> {

  private TowerObject = new BehaviorSubject<ITower[]>([]);
  private LoadingObject = new BehaviorSubject<boolean>(false);

  public loading$ = this.LoadingObject.asObservable();

  constructor(private towerService: TowerService) {}

  connect(collectionViewer: CollectionViewer): Observable<ITower[] | ReadonlyArray<ITower>> {
    return this.TowerObject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.TowerObject.complete();
    this.LoadingObject.complete();
  }

  loadTower() {
    this.LoadingObject.next(true);

    this.towerService.getTowers().subscribe(Towers => this.TowerObject.next(Towers));

  }

}
