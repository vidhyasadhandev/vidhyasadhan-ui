import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesubscribeComponent } from './sitesubscribe.component';

describe('SitesubscribeComponent', () => {
  let component: SitesubscribeComponent;
  let fixture: ComponentFixture<SitesubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
