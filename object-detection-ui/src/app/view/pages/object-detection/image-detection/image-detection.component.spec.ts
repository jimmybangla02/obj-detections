import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetectionComponent } from './image-detection.component';

describe('ImageDetectionComponent', () => {
  let component: ImageDetectionComponent;
  let fixture: ComponentFixture<ImageDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
