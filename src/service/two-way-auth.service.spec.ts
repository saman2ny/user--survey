import { TestBed } from '@angular/core/testing';

import { TwoWayAuthService } from './two-way-auth.service';

describe('TwoWayAuthService', () => {
  let service: TwoWayAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoWayAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
