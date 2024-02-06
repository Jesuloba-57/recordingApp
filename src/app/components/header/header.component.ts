import { Component, OnInit } from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {VideoService} from "../../shared/video.service";
import {VideoComponent} from "../video/video.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    VideoComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'Recorder App';

  constructor(private vid: VideoComponent) {
  }
  ngOnInit(): void{
  }
  startRecord(){
    console.log('Request Permission');
    this.vid.startVideoRecording();
  }

  endRecord(){
    console.log('End');
    this.vid.stopVideoRecording();
  }

}
