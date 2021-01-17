import {ImageDetectionModel} from './image-detection.model';

export interface ImageDetectionState extends ImageDetectionModel {
  id: string | null;
}

export const initialImageDetectionState: ImageDetectionState = {
  id: null,
  result: null
};
