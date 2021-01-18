import { Action } from '@ngrx/store';
import { ObjectDetectionModel } from './object-detection.model';

export type ObjectDetectionActions = GetObjectDetectionResult;

export enum ObjectDetectionActionTypes {
  GET_IMAGE_DETECTION_RESULT = '[ImageDetection] GetImageDetectionResult'
}

export class GetObjectDetectionResult implements Action {
  readonly type = ObjectDetectionActionTypes.GET_IMAGE_DETECTION_RESULT;
  constructor(public payload: ObjectDetectionModel) {
  }
}
