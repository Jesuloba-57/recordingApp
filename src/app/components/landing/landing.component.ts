import { Component, OnInit } from '@angular/core';

import {SharedModule} from "primeng/api";
import {HeaderComponent} from "../header/header.component";
import {VideoComponent} from "../video/video.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    VideoComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{
  constructor(private component: VideoComponent) {
  }
    ngOnInit(): void{


    }
    // startRecord(){
    //   console.log('Passed request')
    //   this.component.startVideoRecording();
    // }
    //
    // endRecord(){
    //   console.log('Passed End')
    //   this.component.stopVideoRecording();
    // }

}
