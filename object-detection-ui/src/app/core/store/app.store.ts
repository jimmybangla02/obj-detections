import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storageSyncMetaReducer } from 'ngrx-store-persist';
import {ImageDetectionState} from '../image-detection/image-detection.store';
import {imageDetectionReducer} from '../image-detection/image-detection.reducer';

export interface AppState {
  ImageDetection?: ImageDetectionState;
}

export const appReducer: ActionReducerMap<any> = {
  ImageDetection: imageDetectionReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['IAuthDetails'], rehydrate: true
    })(reducer);
}



export const metaReducers: MetaReducer<AppState>[] = [storageSyncMetaReducer];
