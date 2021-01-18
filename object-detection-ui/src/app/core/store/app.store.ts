import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storageSyncMetaReducer } from 'ngrx-store-persist';
import {ObjectDetectionState} from '../object-detection/object-detection.store';
import {objectDetectionReducer} from '../object-detection/object-detection.reducer';

export interface AppState {
  ImageDetection?: ObjectDetectionState;
}

export const appReducer: ActionReducerMap<any> = {
  ImageDetection: objectDetectionReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['IAuthDetails'], rehydrate: true
    })(reducer);
}



export const metaReducers: MetaReducer<AppState>[] = [storageSyncMetaReducer];
