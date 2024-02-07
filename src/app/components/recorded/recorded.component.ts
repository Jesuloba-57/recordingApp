import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {VideoService} from "../../shared/video.service";
import {DomSanitizer} from "@angular/platform-browser";
import {HeaderComponent} from "../header/header.component";
import { TableModule } from 'primeng/table';
import {DataService} from "../../shared/data.service";
import {Video} from "../../model/video";

@Component({
  selector: 'app-recorded',
  standalone: true,
  imports: [
    HeaderComponent,
    TableModule
  ],
  templateUrl: './recorded.component.html',
  styleUrl: './recorded.component.css'
})


export class RecordedComponent {
  videoList: Video[] = [];
  videoObj: Video = {
    id:'',
    url:''
  };
  url: string = ''
  recordVideoElement!: HTMLVideoElement;
  videoBlobUrl: any = null;
  video: any = null;

  constructor(private vidComponent: VideoService, private ref: ChangeDetectorRef, private sanitizer: DomSanitizer, private data: DataService) {
    this.vidComponent.getBlob().subscribe((data) => {
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data);
      this.recordVideoElement.src = this.videoBlobUrl;
      this.url = this.videoBlobUrl;
      console.log("Saved: ", this.url);
      this.addVideo();
      //this.vidComponent.playRecording(this.recordVideoElement);
      this.ref.detectChanges();
      // this.recordVideoElement.src = data;
    });
  }

  ngOnInit(){
    this.getAllVideos();
  }

  getAllVideos(){
    this.data.getVideos().subscribe(res => {
      this.videoList = res.map((e:any) => {
        const data = e.payload.doc.data();
        //data.id = e.payload.doc.id;
        this.videoObj.id = e.payload.doc.id;
        this.videoObj.url = e.payload.doc.url;
        this.videoList.push(this.videoObj);
        console.log("Data from table", this.videoList)
        return data;
      })
    }, err => {
      alert("Error while getting data")
    })
  }

  addVideo(){
    this.videoObj.id = '';
    this.videoObj.url = this.url;
    this.data.addVideo(this.videoObj);
  }

  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;

  ngAfterViewInit(): void{
    this.recordVideoElement = this.recordVideoElementRef.nativeElement;
  }

}
