import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTramiteComponent } from './registro-tramite.component';

describe('RegistroTramiteComponent', () => {
  let component: RegistroTramiteComponent;
  let fixture: ComponentFixture<RegistroTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTramiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
