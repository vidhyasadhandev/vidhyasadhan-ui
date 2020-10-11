import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstudentsComponent } from './adminstudents.component';

describe('AdminstudentsComponent', () => {
  let component: AdminstudentsComponent;
  let fixture: ComponentFixture<AdminstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminstudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
