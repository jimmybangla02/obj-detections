import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ImageDetectionService} from '../../../../core/image-detection/image-detection.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {
  getImagePredictionPath
} from '../../../../core/image-detection/image-detection.selector';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/app.store';


@Component({
  selector: 'app-image-detection',
  templateUrl: './image-detection.component.html',
  styleUrls: ['./image-detection.component.less']
})

export class ImageDetectionComponent implements OnInit {

  isLoading: boolean;
  isComplete: boolean;
  imageSrc: string;
  predictionImageSrc: string;

  @ViewChild('img') public imageEl: ElementRef;


  imageDetection = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    blobUrl: new FormControl('', [Validators.required]),
  });

  constructor(private imageDetectionService: ImageDetectionService,
              private sanitizer: DomSanitizer, private store: Store<AppState>) {}


  public async ngOnInit(): Promise<void> {
    this.imageDetectionService.loading.subscribe((status: any) => {
      this.isLoading = status.loading;
      this.isComplete = !status.loading;
    });

    this.store.pipe(select(getImagePredictionPath())).subscribe((prediction: any) => {
      if (prediction) {
        this.predictionImageSrc = prediction;
      }
    });
  }

  onFileChange(event) {
    const reader: any = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.imageDetection.patchValue({
          name: file.name,
          fileSource: reader.result
        });
      };
    }
  }

  get f(){
    return this.imageDetection.controls;
  }

  sanitize( url: string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  reset() {
    console.log('todo work');
  }

  submit(){
        this.isLoading = true;
        this.isComplete = false;
        this.imageDetectionService.getImageDetectionOutput('id', this.imageDetection.value.fileSource);
  }

}
