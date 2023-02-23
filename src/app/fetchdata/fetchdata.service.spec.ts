import { TestBed } from '@angular/core/testing';

import { FetchdataService } from './fetchdata.service';

describe('FetchdataService', () => {
  let service: FetchdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
