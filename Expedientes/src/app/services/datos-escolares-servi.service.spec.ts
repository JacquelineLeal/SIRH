import { TestBed } from '@angular/core/testing';

import { DatosEscolaresServiService } from './datos-escolares-servi.service';

describe('DatosEscolaresServiService', () => {
  let service: DatosEscolaresServiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEscolaresServiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
