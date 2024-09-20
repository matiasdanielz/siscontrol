import { TestBed } from '@angular/core/testing';

import { SalesRequestsService } from './sales-requests.service';

describe('SalesRequestsService', () => {
  let service: SalesRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
