import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitorsComponent } from './view-visitors.component';

describe('ViewVisitorsComponent', () => {
  let component: ViewVisitorsComponent;
  let fixture: ComponentFixture<ViewVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
