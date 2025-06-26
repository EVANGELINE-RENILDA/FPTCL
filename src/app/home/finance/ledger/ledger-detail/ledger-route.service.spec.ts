import { TestBed } from '@angular/core/testing';

import { LedgerRouteService } from './ledger-route.service';

describe('LedgerRouteService', () => {
  let service: LedgerRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgerRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
