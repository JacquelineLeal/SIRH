import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesExistentesComponent } from './expedientes-existentes.component';

describe('ExpedientesExistentesComponent', () => {
  let component: ExpedientesExistentesComponent;
  let fixture: ComponentFixture<ExpedientesExistentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedientesExistentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesExistentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
