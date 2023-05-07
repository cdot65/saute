import { TestBed } from '@angular/core/testing';

import { PanoramaService } from './panorama.service';

describe('PanoramaService', () => {
  let service: PanoramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanoramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
