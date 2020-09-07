import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoassignmentsComponent } from './noassignments.component';

describe('NoassignmentsComponent', () => {
  let component: NoassignmentsComponent;
  let fixture: ComponentFixture<NoassignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoassignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoassignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
