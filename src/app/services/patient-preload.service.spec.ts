import { TestBed } from '@angular/core/testing';

import { PatientPreloadService } from './patient-preload.service';

describe('PatientPreloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientPreloadService = TestBed.get(PatientPreloadService);
    expect(service).toBeTruthy();
  });
});
