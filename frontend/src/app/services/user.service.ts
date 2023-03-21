import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserResponse } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getUserById(id: number): Observable<{ user: IUserResponse}> {
    return this.http.get<{ user: IUserResponse}>(`${environment.api_url}/user/${id}`);
  }

}
