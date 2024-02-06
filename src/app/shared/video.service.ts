import {ElementRef, Injectable, ViewChild} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor() { }
  videoref: any;
  recordVideoElement: any;
  mediaVideoRecorder: any;
  videoRecordedBlobs: Blob[] = [];
  isRecording: boolean = false;
  downloadVideoUrl: any;
  stream!: MediaStream;

  setupCam(): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({
        video: { width: 300, height: 350 },
        audio: false
      }).then(stream => {
        resolve(stream);
      }).catch(err => {
        reject(err);
      });
    });
  }



  startVideoRecording(s: MediaStream) {
    if (this.stream) {
      console.error('No stream available for recording.');
      return;
    }
    this.videoRecordedBlobs = [];
    let options: any = {
      mimeType: 'video/webm'
    };
    try {
      console.log('Stream:', s);
      this.mediaVideoRecorder = new MediaRecorder(s, options);
    } catch (err) {
      console.log(err);
    }
    this.mediaVideoRecorder.start();
    this.isRecording = !this.isRecording;
    this.onDataAvailableVideoEvent();
    this.onStopVideoRecordingEvent();
  }

  stopVideoRecording() {
    this.mediaVideoRecorder.stop();
    this.isRecording = !this.isRecording;
  }

  playRecording() {
    if (!this.videoRecordedBlobs || !this.videoRecordedBlobs.length) {
      return;
    }
    this.recordVideoElement.play();
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
        this.recordVideoElement.src = this.downloadVideoUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }
}
