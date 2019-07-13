import { TestBed } from '@angular/core/testing';

import { FirebaseDbAdapterService } from './firebase-db-adapter.service';

describe('FirebaseDbAdapter.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDbAdapterService = TestBed.get(FirebaseDbAdapterService);
    expect(service).toBeTruthy();
  });
});
