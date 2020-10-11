import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpaymentsComponent } from './adminpayments.component';

describe('AdminpaymentsComponent', () => {
  let component: AdminpaymentsComponent;
  let fixture: ComponentFixture<AdminpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
