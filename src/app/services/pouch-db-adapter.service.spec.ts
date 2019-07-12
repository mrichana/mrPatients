import { TestBed } from '@angular/core/testing';

import { PouchDBAdapterService } from './pouch-db-adapter.service';

describe('PouchDBAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PouchDBAdapterService = TestBed.get(PouchDBAdapterService);
    expect(service).toBeTruthy();
  });
});
