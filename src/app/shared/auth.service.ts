import {Injectable, signal} from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) {  }

  //loginMethod
  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('token','true');
      this.currentUserSig = !this.currentUserSig;
      this.router.navigate(['landing'])
    }, err => {
      alert("User Does not exist!");
      this.router.navigate(['/login']);
    })
  }
  currentUserSig: boolean = false;
  //registration
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
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
