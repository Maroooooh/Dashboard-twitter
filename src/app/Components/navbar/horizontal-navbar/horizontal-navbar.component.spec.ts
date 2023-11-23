import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalNavbarComponent } from './horizontal-navbar.component';

describe('HorizontalNavbarComponent', () => {
  let component: HorizontalNavbarComponent;
  let fixture: ComponentFixture<HorizontalNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalNavbarComponent]
    });
    fixture = TestBed.createComponent(HorizontalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
