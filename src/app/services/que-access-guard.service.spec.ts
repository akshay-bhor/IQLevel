import { TestBed } from '@angular/core/testing';

import { QueAccessGuardService } from './que-access-guard.service';

describe('QueAccessGuardService', () => {
  let service: QueAccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueAccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
