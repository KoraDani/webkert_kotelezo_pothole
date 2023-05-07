import { TestBed } from '@angular/core/testing';

import { LogServService } from './log-serv.service';

describe('LogServService', () => {
  let service: LogServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
