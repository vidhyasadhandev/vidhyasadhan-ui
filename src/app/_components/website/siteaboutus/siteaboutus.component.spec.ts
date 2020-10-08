import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteaboutusComponent } from './siteaboutus.component';

describe('SiteaboutusComponent', () => {
  let component: SiteaboutusComponent;
  let fixture: ComponentFixture<SiteaboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteaboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
