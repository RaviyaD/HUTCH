import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAntennaComponent } from './add-antenna.component';

describe('AddAntennaComponent', () => {
  let component: AddAntennaComponent;
  let fixture: ComponentFixture<AddAntennaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAntennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAntennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
