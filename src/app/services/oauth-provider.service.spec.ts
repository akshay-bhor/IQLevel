import { TestBed } from '@angular/core/testing';

import { OauthProviderService } from './oauth-provider.service';

describe('OauthProviderService', () => {
  let service: OauthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
