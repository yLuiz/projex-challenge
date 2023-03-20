import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface ILogin {
  email: string;
  password: string;
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

    return JSON.parse(token);
  }

  public login({ email, password }: ILogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/user/auth', { email, password });
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
