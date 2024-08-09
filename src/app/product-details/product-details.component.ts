import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, inject, input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  productId!: string;
  productImage: any;
  productTitle!: string;
  productInfo!: string;
  category!: string;
  price!: number;

  private router = inject(Router);
  message = input.required<string>();   // Static Data to Routes

  constructor(private productService: AuthService) {}

  ngOnInit(): void {
    const productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('Input Data: ' + this.message());
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
      console.log(product);
      this.productImage = product.images;
      this.productTitle = product.title;
      this.productInfo = product.description;
      this.category = product.category;
      this.price = product.price;
      this.productId = product.id;
      }
    });

    console.log(this.activatedRoute.snapshot);
  }
}
