import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {LandingComponent} from "./components/landing/landing.component";
import {RecordedComponent} from "./components/recorded/recorded.component";

export const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'recorded', component:RecordedComponent}
];
