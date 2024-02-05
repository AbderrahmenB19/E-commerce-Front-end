import { TestBed } from '@angular/core/testing';

import { ViewDetailsResolverService } from './view-details-resolver.service';

describe('ViewDetailsResolverService', () => {
  let service: ViewDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
