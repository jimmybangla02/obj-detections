import {ObjectDetectionModel} from './object-detection.model';

export interface ObjectDetectionState extends ObjectDetectionModel {
  id: string | null;
}

export const initialObjectDetectionState: ObjectDetectionState = {
  id: null,
  result: null
};
