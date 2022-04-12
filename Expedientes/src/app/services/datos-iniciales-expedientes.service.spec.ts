import { TestBed } from '@angular/core/testing';

import { DatosInicialesExpedientesService } from './datos-iniciales-expedientes.service';

describe('DatosInicialesExpedientesService', () => {
  let service: DatosInicialesExpedientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosInicialesExpedientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
