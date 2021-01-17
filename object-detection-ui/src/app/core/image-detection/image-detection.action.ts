import { Action } from '@ngrx/store';
import { ImageDetectionModel } from './image-detection.model';

export type ImageDetectionActions = GetImageDetectionResult;

export enum ImageDetectionActionTypes {
  GET_IMAGE_DETECTION_RESULT = '[ImageDetection] GetImageDetectionResult'
}

export class GetImageDetectionResult implements Action {
  readonly type = ImageDetectionActionTypes.GET_IMAGE_DETECTION_RESULT;
  constructor(public payload: ImageDetectionModel) {
  }
}
