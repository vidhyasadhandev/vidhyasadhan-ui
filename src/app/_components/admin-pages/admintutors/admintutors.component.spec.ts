import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintutorsComponent } from './admintutors.component';

describe('AdmintutorsComponent', () => {
  let component: AdmintutorsComponent;
  let fixture: ComponentFixture<AdmintutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintutorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
