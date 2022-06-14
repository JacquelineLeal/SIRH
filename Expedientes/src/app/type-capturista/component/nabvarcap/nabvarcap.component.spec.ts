import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabvarcapComponent } from './nabvarcap.component';

describe('NabvarcapComponent', () => {
  let component: NabvarcapComponent;
  let fixture: ComponentFixture<NabvarcapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabvarcapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NabvarcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
