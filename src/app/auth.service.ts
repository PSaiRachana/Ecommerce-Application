import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './products/products.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private productsApiUrl = 'https://dummyjson.com/products';
  private loginApiUrl = 'https://dummyjson.com/auth/login';
  private userApiUrl = 'http://dummyjson.com/users/add';

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
        return response;
      })
    );
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
  
}
