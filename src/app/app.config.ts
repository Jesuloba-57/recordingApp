import { NgModule } from "@angular/core";
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {MessageService} from "primeng/api";
import {VideoService} from "./shared/video.service";
import {VideoComponent} from "./components/video/video.component";




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), VideoComponent, provideClientHydration(), MessageService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }]
};
