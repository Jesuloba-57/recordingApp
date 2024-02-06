import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {StyleClassModule} from "primeng/styleclass";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import { CommonModule } from '@angular/common';
import {AuthService} from "../../shared/auth.service";
import {passwordMatchValidator} from "../../shared/pw-match-dir";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    StyleClassModule,
    RouterLink,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    // fullName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+(?: [a-zA-z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, {
    Validators: passwordMatchValidator
  })
  constructor(private fb: FormBuilder, private auth: AuthService, private messageServrice : MessageService) {}

  get email(){
    return this.registerForm.controls['email']
  }

  get password(){
    return this.registerForm.controls['password']
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword']
  }

  get fullname(){
    return this.registerForm.controls['fullName']
  }

  submitCred(){
    const postData = { ...this.registerForm.value}
    delete postData.confirmPassword;
    this.auth.register(postData.email, postData.password);
  }

}
