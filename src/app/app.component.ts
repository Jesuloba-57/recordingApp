import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {ReactiveFormsModule} from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import {VideoComponent} from "./components/video/video.component";
import { AngularFireModule } from '@angular/fire/compat';
import {MessageService} from "primeng/api";
import {RecordedComponent} from "./components/recorded/recorded.component";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent, VideoComponent, RecordedComponent,
    ButtonModule, ToastModule,
    CardModule, InputTextModule, CommonModule,
    ReactiveFormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {

  }

}
