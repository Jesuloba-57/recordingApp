import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {VideoService} from "../../shared/video.service";
import {DomSanitizer} from "@angular/platform-browser";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-recorded',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './recorded.component.html',
  styleUrl: './recorded.component.css'
})


export class RecordedComponent {
  constructor(private vidComponent: VideoService, private ref: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    // this.recordVideoElement.src
    this.vidComponent.getBlob().subscribe((data) => {
      console.log("data: ", data);
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data);
      this.recordVideoElement.src = this.videoBlobUrl;
      this.vidComponent.playRecording(this.recordVideoElement);
      this.ref.detectChanges();
      // this.recordVideoElement.src = data;
    });


  }
  recordVideoElement!: HTMLVideoElement;
  videoBlobUrl: any = null;

  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;

  ngAfterViewInit(): void{
    this.recordVideoElement = this.recordVideoElementRef.nativeElement;
  }

}
