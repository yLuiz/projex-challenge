import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const myToken = this.authService.getToken();

    if (!myToken) {
      
      const url = req.url.split('/');

      if (url.includes('auth')) {
        return next.handle(req);
      }

      this.router.navigate(['/login']);
    }

    const authRequest = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${myToken}`
      }
    });

    return next.handle(authRequest);

  }
}