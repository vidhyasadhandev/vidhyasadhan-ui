import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptivereportsComponent } from './adaptivereports.component';

describe('AdaptivereportsComponent', () => {
  let component: AdaptivereportsComponent;
  let fixture: ComponentFixture<AdaptivereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptivereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptivereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
