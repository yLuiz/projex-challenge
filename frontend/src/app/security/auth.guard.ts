import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const localToken = localStorage.getItem('token');
  
    if (!localToken) {
      return false;
    };
    
    const isValidToken = await jwt_decode(String(localToken));

    console.log(isValidToken);

    return true;

  }
  
}
