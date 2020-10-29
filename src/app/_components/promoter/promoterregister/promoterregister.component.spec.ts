import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterregisterComponent } from './promoterregister.component';

describe('PromoterregisterComponent', () => {
  let component: PromoterregisterComponent;
  let fixture: ComponentFixture<PromoterregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
