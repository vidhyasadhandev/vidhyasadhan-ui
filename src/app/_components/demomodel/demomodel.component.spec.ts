import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemomodelComponent } from './demomodel.component';

describe('DemomodelComponent', () => {
  let component: DemomodelComponent;
  let fixture: ComponentFixture<DemomodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemomodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemomodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
