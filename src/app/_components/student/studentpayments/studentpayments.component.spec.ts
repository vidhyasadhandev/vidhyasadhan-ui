import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentpaymentsComponent } from './studentpayments.component';

describe('StudentpaymentsComponent', () => {
  let component: StudentpaymentsComponent;
  let fixture: ComponentFixture<StudentpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentpaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
