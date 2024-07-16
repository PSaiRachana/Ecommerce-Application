import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
{path:'', component: HomeComponent},

{
  path: 'signup',
  loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
},

{
  path: 'login',
  loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
}

];
