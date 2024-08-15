import { TestBed } from '@angular/core/testing';

import { UltimoDatoService } from './ultimo-dato.service';

describe('UltimoDatoService', () => {
  let service: UltimoDatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimoDatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
