import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDetectionComponent } from './video-detection.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClrProgressBarModule} from '@clr/angular';
import {WebcamModule} from 'ngx-webcam';



@NgModule({
  declarations: [VideoDetectionComponent],
  exports: [VideoDetectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrProgressBarModule,
    WebcamModule
  ]
})
export class VideoDetectionModule { }
