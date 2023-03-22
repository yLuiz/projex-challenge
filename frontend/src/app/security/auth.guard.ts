import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const localToken = localStorage.getItem('token');
  
    const url = route.url[0].path;
    const loginOrRegister = url === "login" || url === "register";

    
    if (loginOrRegister && !localToken) {
      console.log(url);
      return true;
    }

    if (loginOrRegister && localToken) {
      this.router.navigate(['/home'])
      return false;
    }

    if (!localToken && !loginOrRegister) {
      this.router.navigate(['/login']);
      return false;
    };

    if (localToken) {
      const validToken = this.authService.isValidToken(localToken);
      if (!validToken) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;

  }
  
}
