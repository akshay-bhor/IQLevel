import { TestBed } from '@angular/core/testing';

import { QuesGuardService } from './ques-guard.service';

describe('QuesGuardService', () => {
  let service: QuesGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuesGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
