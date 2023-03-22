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

  public isValidToken(token?: string) {

    if (!token) {
      return false;
    }

    const date = this.getExpireDateToken(token);    

    if (date === undefined || date === null) {
      return false;
    }
    
    return (date.valueOf() > new Date().valueOf());// a data que veio do token `e maior que a data atual?
  }

  public async getDecodedToken() {
    const token = this.getToken();

    if (!token) return null;

    const decodedToken = await jwt_decode(token);
    return decodedToken as IDecodedToken;
  }


  public getExpireDateToken(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);//crio um Date() com o menor valor inicial permitido. Wed Dec 31 1969 20:00:00 GMT-0400 (Horário Padrão do Amazonas)

    date.setUTCSeconds(decoded.exp);//o jwt define a expiracao em formato [segundos-UTC]. 
    return date;
  }

  public login({ email, password }: ILogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.api_url}/user/auth`, { email, password });
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
