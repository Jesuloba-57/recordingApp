import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
declare var MediaRecorder: any;

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private router : Router) { }

  mediaVideoRecorder: any;
  videoRecordedBlobs: Blob[] = [];
  isRecording: boolean = false;
  downloadVideoUrl: any;
  stream!: MediaStream;
  private _blobs = new Subject<any>();

  setupCam(): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({
        video: { width: 300, height: 350 },
        audio: false
      }).then(stream => {
        resolve(stream);
        this.stream = stream;
      }).catch(err => {
        reject(err);
      });
    });
  }

  getBlob(){
    return this._blobs.asObservable();
  }

  startVideoRecording() {
    if (!this.stream) {
      console.error('No stream available for recording.');
      return;
    }
    this.videoRecordedBlobs = [];
    let options: any = {
      mimeType: 'video/webm'
    };
    try {
      //console.log('Stream:', this.stream);
      this.mediaVideoRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }
    this.mediaVideoRecorder.start();
    this.isRecording = !this.isRecording;
    this.onDataAvailableVideoEvent();
    this.onStopVideoRecordingEvent();
  }

  stopVideoRecording() {
    if (!this.isRecording){
      return;
    }
    this.mediaVideoRecorder.stop();
    //this.mediaVideoRecorder.destroy();
    this.isRecording = !this.isRecording;
    this.router.navigate(['/recorded']);
  }

  playRecording(recordVideoElement: HTMLVideoElement) {
    // if (!this.videoRecordedBlobs || !this.videoRecordedBlobs.length) {
    //   return;
    // }
    recordVideoElement.play();
  }
  onDataAvailableVideoEvent() {
    try {
      this.mediaVideoRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.videoRecordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopVideoRecordingEvent() {
    try {
      this.mediaVideoRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.videoRecordedBlobs, {
          type: 'video/webm'
        });
        this.downloadVideoUrl = window.URL.createObjectURL(videoBuffer);
        this._blobs.next(this.downloadVideoUrl);
        // recordVideoElement.src = this.downloadVideoUrl;
        console.log("Here is the video URL:", this.downloadVideoUrl)
      };
    } catch (error) {
      console.log(error);
    }
  }
}
