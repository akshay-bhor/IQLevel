import { TestBed } from '@angular/core/testing';

import { LevelAccessGuardService } from './level-access-guard.service';

describe('LevelAccessGuardService', () => {
  let service: LevelAccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelAccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
