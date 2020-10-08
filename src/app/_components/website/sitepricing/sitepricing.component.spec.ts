import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitepricingComponent } from './sitepricing.component';

describe('SitepricingComponent', () => {
  let component: SitepricingComponent;
  let fixture: ComponentFixture<SitepricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitepricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitepricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
