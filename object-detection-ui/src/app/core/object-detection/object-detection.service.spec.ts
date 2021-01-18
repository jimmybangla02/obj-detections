import { TestBed } from '@angular/core/testing';

import { ImageDetectionService } from './image-detection.service';

describe('ImageDetectionService', () => {
  let service: ImageDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
