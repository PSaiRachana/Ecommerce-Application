import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
{path:'', component: HeaderComponent},
{path:'login', component: LoginComponent},
// {path:'signup', component: SignupComponent},

 {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
      },
];

