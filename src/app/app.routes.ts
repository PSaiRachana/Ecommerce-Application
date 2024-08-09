import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
{path:'', redirectTo: '/login', pathMatch: 'full'},
{
  path:'home', 
  component: HomeComponent,
  title: 'No product selected',
  canActivate: [AuthGuard]
},
{
  path: 'product/:productId', 
  component: ProductDetailsComponent,
  data: {
    message: "Hello!"
  } // Static Data to Routes
},
{
  path: 'signup',
  loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
},
{
  path: 'login',
  loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
},
{
  path: '**',  // Not Found Route
  component: NotFoundComponent
}

];
