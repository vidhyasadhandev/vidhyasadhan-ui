import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterloginComponent } from './promoterlogin.component';

describe('PromoterloginComponent', () => {
  let component: PromoterloginComponent;
  let fixture: ComponentFixture<PromoterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
