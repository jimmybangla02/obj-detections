import {ImageDetectionState, initialImageDetectionState} from './image-detection.store';
import {ImageDetectionActions, ImageDetectionActionTypes} from './image-detection.action';

export function imageDetectionReducer(
  state: ImageDetectionState = initialImageDetectionState,
  action: ImageDetectionActions,
): ImageDetectionState {
  switch (action.type) {
    case ImageDetectionActionTypes.GET_IMAGE_DETECTION_RESULT:
      return state = action.payload;
    default:
      return state;
  }
}
