import {Injectable, signal} from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fireauth : AngularFireAuth, private router : Router) {
    this.stateMonitor();
  }

  //loginMethod
  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( (cred) => {
      // localStorage.setItem('token','true');
      this.currentUserSig = !this.currentUserSig;
      this.router.navigate(['landing'])
    }, err => {
      alert("User Does not exist!");
      this.router.navigate(['/login']);
    })
  }



  //monitor login states
  stateMonitor(){
    this.fireauth.onAuthStateChanged(user => {
      if (user) {
        console.log("User logged in: ", user.email)
        this.currentUserSig = !this.currentUserSig;
        this.router.navigate(['landing'])
      } else {
        console.log("User logged out");
      }
    })
  }

  currentUserSig: boolean = false;
  //registration
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( (cred) => {
      alert('Registration Successful');
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //sign out
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.currentUserSig = !this.currentUserSig;
      this.router.navigate(['/login']);
    }, err =>{
      alert(err.message)
    })
  }
}
