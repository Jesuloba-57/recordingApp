import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean{
    // return !!localStorage.getItem("token");
    if(!this.auth.currentUserSig){
      this.router.navigate(['/login']);
    }
    return this.auth.currentUserSig;
  }

}
