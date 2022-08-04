import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbararchComponent } from './navbararch.component';

describe('NavbararchComponent', () => {
  let component: NavbararchComponent;
  let fixture: ComponentFixture<NavbararchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbararchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbararchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
