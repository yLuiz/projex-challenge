import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public getToken() {
    return "token";
  }

  public login({ email, password }: ILogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/user/auth', { email, password });
  }
}
