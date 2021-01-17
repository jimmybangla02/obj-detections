import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-video-detection',
  templateUrl: './video-detection.component.html',
  styleUrls: ['./video-detection.component.less']
})
export class VideoDetectionComponent implements OnInit, AfterViewInit {

  isLoading: boolean;
  isComplete: boolean;
  videoSrc: string;
  predictionVideoSrc: string;

  @ViewChild('video') public video: ElementRef;
  @ViewChild('videoPrediction') public videoPrediction: ElementRef;

  videoDetection = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    videoSource: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const video = this.video.nativeElement;
    const videoPrediction = this.videoPrediction.nativeElement;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        video.srcObject = stream;
        videoPrediction.srcObject = stream;
      })
        .catch((error) => {console.log(error); });
    }
  }

  submit(){
    // console.log(this.myForm.value);
    this.isLoading = true;
    // setTimeout(() => {
    //   this.imageDetectionService.getImageDetectionOutput('id', this.imageDetection.value.fileSource);
    // }, 3000);
  }

}
