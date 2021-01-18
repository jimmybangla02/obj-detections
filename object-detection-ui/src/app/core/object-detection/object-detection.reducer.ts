import {ObjectDetectionState, initialObjectDetectionState} from './object-detection.store';
import {ObjectDetectionActions, ObjectDetectionActionTypes} from './object-detection.action';

export function objectDetectionReducer(
  state: ObjectDetectionState = initialObjectDetectionState,
  action: ObjectDetectionActions,
): ObjectDetectionState {
  switch (action.type) {
    case ObjectDetectionActionTypes.GET_IMAGE_DETECTION_RESULT:
      return state = action.payload;
    default:
      return state;
  }
}
