import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    })
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should request from Giphy API and data length should be equal to 9', (done) => {
    const service: ApiService = TestBed.get(ApiService);
    const data$ = service.getGiphys("test");
    data$.subscribe(res => {
      expect(res.data.length).toBe(9);
      done();
    })
  });
});
