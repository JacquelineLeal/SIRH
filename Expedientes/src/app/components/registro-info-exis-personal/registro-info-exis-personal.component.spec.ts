import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInfoExisPersonalComponent } from './registro-info-exis-personal.component';

describe('RegistroInfoExisPersonalComponent', () => {
  let component: RegistroInfoExisPersonalComponent;
  let fixture: ComponentFixture<RegistroInfoExisPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroInfoExisPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInfoExisPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
