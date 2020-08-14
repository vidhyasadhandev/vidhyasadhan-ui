import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventmodelComponent } from './eventmodel.component';

describe('EventmodelComponent', () => {
  let component: EventmodelComponent;
  let fixture: ComponentFixture<EventmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
