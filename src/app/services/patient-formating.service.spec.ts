import { TestBed } from '@angular/core/testing';

import { PatientFormatingService } from './patient-formating.service';

describe('PatientFormatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientFormatingService = TestBed.get(PatientFormatingService);
    expect(service).toBeTruthy();
  });
});
