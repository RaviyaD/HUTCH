import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusageComponent } from './editusage.component';

describe('EditusageComponent', () => {
  let component: EditusageComponent;
  let fixture: ComponentFixture<EditusageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditusageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
