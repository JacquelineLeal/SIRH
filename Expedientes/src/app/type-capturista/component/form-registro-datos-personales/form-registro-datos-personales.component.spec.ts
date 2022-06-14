import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroDatosPersonalesComponent } from './form-registro-datos-personales.component';

describe('FormRegistroDatosPersonalesComponent', () => {
  let component: FormRegistroDatosPersonalesComponent;
  let fixture: ComponentFixture<FormRegistroDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistroDatosPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
