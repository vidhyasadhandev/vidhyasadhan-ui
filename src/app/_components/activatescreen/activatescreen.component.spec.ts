import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatescreenComponent } from './activatescreen.component';

describe('ActivatescreenComponent', () => {
  let component: ActivatescreenComponent;
  let fixture: ComponentFixture<ActivatescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivatescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
