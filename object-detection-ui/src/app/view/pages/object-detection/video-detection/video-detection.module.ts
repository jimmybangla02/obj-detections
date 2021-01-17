import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDetectionComponent } from './video-detection.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ClrProgressBarModule} from "@clr/angular";



@NgModule({
  declarations: [VideoDetectionComponent],
  exports: [VideoDetectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrProgressBarModule
  ]
})
export class VideoDetectionModule { }
