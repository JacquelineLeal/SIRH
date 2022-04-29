import { TestBed } from '@angular/core/testing';

import { DatosPDomComService } from './datos-p-dom-com.service';

describe('DatosPDomComService', () => {
  let service: DatosPDomComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPDomComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
