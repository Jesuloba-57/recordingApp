import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {VideoService} from "../../shared/video.service";

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [

  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit{
  constructor(private vidComponent: VideoService) {

  }
  videoref: any;
  recordVideoElement: any;
  // mediaVideoRecorder: any;
  // videoRecordedBlobs: Blob[] = [];
  // isRecording: boolean = false;
  // downloadVideoUrl: any;
  stream: any | undefined;
  @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef;
  @ViewChild('liveVideo') videoElementRef!: ElementRef;

  async useCam(){
    try {
      this.stream = await this.vidComponent.setupCam(); // Assign stream returned by setupCam() to this.stream
      console.log("Stream: ", this.stream);
      this.videoref = this.videoElementRef.nativeElement;
      this.recordVideoElement = this.recordVideoElementRef.nativeElement;
      this.videoref.srcObject = this.stream;
    } catch (err) {
      console.log(err);
    }
  }

  async ngOnInit(){
    // this.videoref = document.getElementById('video');
    console.log("The Video Reference is:", this.videoref);
    await this.useCam();
  }

  startVideoRecording() {
    this.vidComponent.startVideoRecording(this.stream);
  }
//
  stopVideoRecording() {
    this.vidComponent.stopVideoRecording();
  }

  // playRecording() {
  //   if (!this.videoRecordedBlobs || !this.videoRecordedBlobs.length) {
  //     return;
  //   }
  //   this.recordVideoElement.play();
  // }
  // onDataAvailableVideoEvent() {
  //   try {
  //     this.mediaVideoRecorder.ondataavailable = (event: any) => {
  //       if (event.data && event.data.size > 0) {
  //         this.videoRecordedBlobs.push(event.data);
  //       }
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
//
//   onStopVideoRecordingEvent() {
//     try {
//       this.mediaVideoRecorder.onstop = (event: Event) => {
//         const videoBuffer = new Blob(this.videoRecordedBlobs, {
//           type: 'video/webm'
//         });
//         this.downloadVideoUrl = window.URL.createObjectURL(videoBuffer);
//         this.recordVideoElement.src = this.downloadVideoUrl;
//       };
//     } catch (error) {
//       console.log(error);
//     }
// }
}
