import {Component, NgModule} from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import { CommonModule } from '@angular/common';
import {AuthService} from "../../shared/auth.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
    RouterLink,
    NgIf,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private auth : AuthService) {
  }

  get email(){
    return this.loginForm.controls['email']
  }

  get password(){
    return this.loginForm.controls['password']
  }

  login(){
    const {email, password } = this.loginForm.value;
    //console.log("Logging in: ", email)
    this.auth.login(email as string, password as string);
  }
}
