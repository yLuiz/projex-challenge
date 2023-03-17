import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../app/services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const myToken = this.loginService.getToken();

    if (!myToken) {
      throw new Error("Token not found.")
    }

    const authRequest = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${myToken}`
      }
    });

    return next.handle(authRequest);

  }
}