import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ObjectDetectionService} from '../../../../core/object-detection/object-detection.service';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {select, Store} from '@ngrx/store';
import {getObjectPredictionPath} from '../../../../core/object-detection/object-detection.selector';
import {AppState} from '../../../../core/store/app.store';

@Component({
  selector: 'app-video-detection',
  templateUrl: './video-detection.component.html',
  styleUrls: ['./video-detection.component.less']
})
export class VideoDetectionComponent implements OnInit, AfterViewInit {

  isLoading: boolean;
  isComplete: boolean;
  videoSrc: string;
  predictionImageSrc: string;
  predictions: any = [];

  buttonText = 'Start Prediction';

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  private triggerInterval: any;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  @ViewChild('video') public video: ElementRef;
  @ViewChild('videoPrediction') public videoPrediction: ElementRef;

  videoDetection = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private objectDetectionService: ObjectDetectionService, private store: Store<AppState>, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    this.store.pipe(select(getObjectPredictionPath())).subscribe((prediction: any) => {
      if (prediction) {
        this.predictionImageSrc = prediction;
      }
    });
  }

  ngAfterViewInit(): void {
    // const video = this.video.nativeElement;
    // this.runLocalMedia(video);
  }

  submit(){
    if (this.buttonText === 'Stop Prediction') {
      this.buttonText = 'Start Prediction';
      this.isLoading = false;
      if (this.triggerInterval) {
        clearInterval(this.triggerInterval);
      }
    } else {
      this.isLoading = true;
      this.buttonText = 'Stop Prediction';
      this.triggerSnapshot();
    }
  }

  sanitize( url: string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  runLocalMedia(params) {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        params.srcObject = stream;
      })
        .catch((error) => {console.log(error); });
    }
  }

  public triggerSnapshot(): void {
    this.triggerInterval =  setInterval(() => {
      this.trigger.next();
    }, 3000);
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.objectDetectionService.getImageDetectionOutput('id', this.webcamImage.imageAsDataUrl);
    console.log(this.webcamImage, 'predictionVideoSrc');
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
