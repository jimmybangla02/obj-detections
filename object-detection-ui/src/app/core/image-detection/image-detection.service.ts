import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {APIService} from '../api/api.service';
import {HttpClient} from '@angular/common/http';
import {AppState} from '../store/app.store';
import {Store} from '@ngrx/store';
import {GetImageDetectionResult} from './image-detection.action';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageDetectionService {

  imageDetection: any = {
    path : '/object-detection/',
  };

  isError = new Subject();
  loading = new Subject();

  constructor(
    private api: APIService,
    private http: HttpClient,
    private store: Store<AppState>) { }

    getImageDetectionOutput(id, query) {
      this.loading.next({status: true});
      this.http.post(`${environment.restUrl}${this.imageDetection.path}`, query, {
        reportProgress: true,
        observe: 'events',
      }).subscribe((events: any) => {
        if (events.status === 200 && events.body) {
            this.loading.next({status: false});
            const output: any = {id, result: events.body};
            this.store.dispatch(new GetImageDetectionResult(output));
        }
      }, error => {
        console.log(error.message, 'error');
      });
    }
}
