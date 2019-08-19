import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusReportComponent } from './status-report.component';

describe('StatusReportComponent', () => {
  let component: StatusReportComponent;
  let fixture: ComponentFixture<StatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
