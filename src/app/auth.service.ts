import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from './products/products.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private productsApiUrl = 'https://dummyjson.com/products';
  private loginApiUrl = 'https://dummyjson.com/auth/login';
  private userApiUrl = 'http://dummyjson.com/users/add';
  private productApiUrl = 'https://dummyjson.com/products/1';

  private isLoggedIn = false;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<{products: Product[]}> {
    return this.httpClient.get<{products: Product[]}>(this.productsApiUrl);
  }

  login(user: any, expiresInMins: number = 30): Observable<any> {
    return this.httpClient.post(this.loginApiUrl, {
      username: user.username,
      password: user.password,
      expiresInMins: expiresInMins
    }).pipe(
      map(response => {
        this.isLoggedIn = true;
        return response;
      }),
      catchError(err => {
        this.isLoggedIn = false;
        return of(err);
      })
    );
  }
  
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
  }

  registerUser(user: any): Observable<any> {
    return this.httpClient.post(this.userApiUrl, {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.passwords.password
    }).pipe(
      map(response => {
        return response;
      })
    );
  }
  
  getProductById(id: number): Observable<any> {
    return this.httpClient.get(this.productApiUrl);
  }
  
}
