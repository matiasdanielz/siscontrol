import { TestBed } from '@angular/core/testing';

import { PageDefaultService } from './page-default.service';

describe('PageDefaultService', () => {
  let service: PageDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
