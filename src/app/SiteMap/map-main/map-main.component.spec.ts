import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMainComponent } from './map-main.component';

describe('MapMainComponent', () => {
  let component: MapMainComponent;
  let fixture: ComponentFixture<MapMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
