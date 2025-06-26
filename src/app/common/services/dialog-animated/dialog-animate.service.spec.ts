import { TestBed } from '@angular/core/testing';

import { DialogAnimateService } from './dialog-animate.service';

describe('DialogAnimateService', () => {
  let service: DialogAnimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAnimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
