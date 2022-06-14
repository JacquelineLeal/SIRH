import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDatosPersonaExistenteComponent } from './registro-datos-persona-existente.component';

describe('RegistroDatosPersonaExistenteComponent', () => {
  let component: RegistroDatosPersonaExistenteComponent;
  let fixture: ComponentFixture<RegistroDatosPersonaExistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDatosPersonaExistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDatosPersonaExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
