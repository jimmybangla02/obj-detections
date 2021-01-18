import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

export const getObjectDetectionState = createSelector((state: AppState) => state, (state: AppState) => state.ImageDetection);

export const getObjectDetectionResult = () => createSelector(
  getObjectDetectionState,
  (d) => d && d.result ? d.result : null
);

export const getObjectPredictionPath = () => createSelector(
  getObjectDetectionResult(),
  (d: any) => d && d.path ? d.path : ''
);
