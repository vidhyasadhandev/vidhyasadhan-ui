import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterlayoutComponent } from './promoterlayout.component';

describe('PromoterlayoutComponent', () => {
  let component: PromoterlayoutComponent;
  let fixture: ComponentFixture<PromoterlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterlayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
