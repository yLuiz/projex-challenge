import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

interface ILogin {
  email: string;
  password: string;
}

export interface IDecodedToken {
  email: string,
  password: string,
  sub: number, 
  iat: number, 
  exp: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getToken() {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    };

    return token as string;
  }

  public async getDecodedToken() {
    const token = this.getToken();

    if (!token) return null;

    const decodedToken = await jwt_decode(token);
    return decodedToken as IDecodedToken;
  }

  public login({ email, password }: ILogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.api_url}/user/auth`, { email, password });
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
