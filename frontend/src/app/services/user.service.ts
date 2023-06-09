import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserRequest, IUserResponse } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  sendingUser = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getUserById(id: number): Observable<{ user: IUserResponse}> {
    return this.http.get<{ user: IUserResponse}>(`${environment.api_url}/user/${id}`);
  }

  public register({name, email, password}: IUserRequest) {
    return this.http.post<{ user: IUserResponse}>(`${environment.api_url}/user/`, {
      name,
      email,
      password
    });
  }

  public update({name, email, password}: IUserRequest) {
    return this.http.put<{ user: IUserResponse}>(`${environment.api_url}/user/`, {
      name,
      email,
      password
    });
  }

}
