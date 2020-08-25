import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorReferralsDetailsComponent } from './tutor-referrals-details.component';

describe('TutorReferralsDetailsComponent', () => {
  let component: TutorReferralsDetailsComponent;
  let fixture: ComponentFixture<TutorReferralsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorReferralsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorReferralsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
