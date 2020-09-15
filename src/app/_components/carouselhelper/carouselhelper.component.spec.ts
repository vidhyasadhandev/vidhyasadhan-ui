import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselhelperComponent } from './carouselhelper.component';

describe('CarouselhelperComponent', () => {
  let component: CarouselhelperComponent;
  let fixture: ComponentFixture<CarouselhelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselhelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselhelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
