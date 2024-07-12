import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // products: any[] = [];
  
  // constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.authService.getProducts().subscribe((products) => {
  //     this.products = products;
  //   });
  // }

  // ngOnInit(): void {
  //   this.products = this.authService.getProducts();
  // }
}
