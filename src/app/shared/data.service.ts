import { Injectable } from '@angular/core';
import {Firestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Video} from "../model/video";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public afs: AngularFirestore) {
    //db.settings({ timestampInSnapshots: true }) //update firestore setting
  }

  addVideo(video: Video){
    video.id = this.afs.createId();
    return this.afs.collection('/videos').add(video);
  }

  getVideos(){
    return this.afs.collection('/videos').snapshotChanges();
  }

  deleteVideo(video: Video){
    return this.afs.doc('/videos/'+video.id).delete();
  }

  updateVideo(video: Video){
    this.deleteVideo(video);
    this.addVideo(video);
  }

}
