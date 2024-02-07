import { Component, OnInit } from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {VideoService} from "../../shared/video.service";
import {VideoComponent} from "../video/video.component";
import {AuthService} from "../../shared/auth.service";

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

  constructor(private vid: VideoComponent, private auth: AuthService) {
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


  signout(){
    alert("Successfully Siigned out!");
    this.auth.logout();
  }

}
