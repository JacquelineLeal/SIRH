import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercapComponent } from './footercap.component';

describe('FootercapComponent', () => {
  let component: FootercapComponent;
  let fixture: ComponentFixture<FootercapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootercapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
