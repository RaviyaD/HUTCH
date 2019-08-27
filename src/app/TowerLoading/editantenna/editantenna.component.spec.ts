import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditantennaComponent } from './editantenna.component';

describe('EditantennaComponent', () => {
  let component: EditantennaComponent;
  let fixture: ComponentFixture<EditantennaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditantennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditantennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
