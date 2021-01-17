import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDetectionComponent } from './image-detection.component';
import {ClrIconModule, ClrInputModule, ClrProgressBarModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ImageDetectionComponent],
  exports: [ImageDetectionComponent],
    imports: [
        CommonModule,
        ClrInputModule,
        FormsModule,
        ReactiveFormsModule,
        ClrProgressBarModule,
        ClrIconModule
    ]
})
export class ImageDetectionModule { }
