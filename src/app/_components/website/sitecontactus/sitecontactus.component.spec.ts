import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitecontactusComponent } from './sitecontactus.component';

describe('SitecontactusComponent', () => {
  let component: SitecontactusComponent;
  let fixture: ComponentFixture<SitecontactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitecontactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitecontactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
