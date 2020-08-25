import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorReferralsComponent } from './tutor-referrals.component';

describe('TutorReferralsComponent', () => {
  let component: TutorReferralsComponent;
  let fixture: ComponentFixture<TutorReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
