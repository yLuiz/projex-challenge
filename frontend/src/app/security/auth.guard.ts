import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const localToken = localStorage.getItem('token');
  
    const url = route.url[0].path;

    if (!localToken && url !== "login") {
      this.router.navigate(['/login']);
      return false;
    };
    
    if (url === "login" && !localToken) {
      console.log(localToken);
      return true;
    }


    if (url === "login" && localToken) {
      this.router.navigate(['/home'])
      return false;
    }

    const decodeToken = await jwt_decode(String(localToken));

    // console.log(decodeToken);

    return true;

  }
  
}
