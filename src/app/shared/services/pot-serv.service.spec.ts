import { TestBed } from '@angular/core/testing';

import { PotServService } from './pot-serv.service';

describe('PotServService', () => {
  let service: PotServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
