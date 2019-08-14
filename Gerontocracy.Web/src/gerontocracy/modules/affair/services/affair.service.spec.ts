import { TestBed } from '@angular/core/testing';

import { AffairService } from './affair.service';

describe('AffairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffairService = TestBed.get(AffairService);
    expect(service).toBeTruthy();
  });
});
