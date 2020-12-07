import { TestBed } from '@angular/core/testing';

import { SeoServiceService } from './seo.service';

describe('SeoService', () => {
  let service: SeoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
