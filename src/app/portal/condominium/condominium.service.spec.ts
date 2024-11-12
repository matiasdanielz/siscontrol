import { TestBed } from '@angular/core/testing';

import { CondominiumService } from './condominium.service';

describe('CondominiumService', () => {
  let service: CondominiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondominiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
