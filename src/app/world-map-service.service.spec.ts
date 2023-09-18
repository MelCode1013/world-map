import { TestBed } from '@angular/core/testing';

import { WorldMapServiceService } from './world-map-service.service';

describe('WorldMapServiceService', () => {
  let service: WorldMapServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldMapServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
