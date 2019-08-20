import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitorsComponent } from './add-visitors.component';

describe('AddVisitorsComponent', () => {
  let component: AddVisitorsComponent;
  let fixture: ComponentFixture<AddVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
