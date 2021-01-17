import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

export const getImageDetectionState = createSelector((state: AppState) => state, (state: AppState) => state.ImageDetection);

export const getImageDetectionResult = () => createSelector(
  getImageDetectionState,
  (d) => d && d.result ? d.result : null
);

export const getImagePredictionPath = () => createSelector(
  getImageDetectionResult(),
  (d: any) => d && d.path ? d.path : ''
);
