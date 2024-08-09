import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Product } from '../products/products.model';
import { catchError, map, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  products = signal<Product[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');   // Handling HTTP Errors
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isFetching.set(true);  // Loading Fallback
    const subscription = this.authService.getProducts()
    .pipe(
      map((resData) => resData.products), 
      catchError((error) => {
        console.log(error);
        return throwError(() => 
          new Error('Something went wrong fetching the available products. Please try again later.')
        );
      })
    )
    .subscribe({
      next: (products) => {
        this.products.set(products);
        console.log(products);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}
