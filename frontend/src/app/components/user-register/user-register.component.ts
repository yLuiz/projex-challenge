import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRequest } from 'src/interfaces/user.interface';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  registerUser(user: IUserRequest) {
    this.userService.register(user).subscribe({
      next: (response) => {
        this.authService.login({email: user.email, password: user.password })
          .subscribe({
            next: (response) => {
              if (response.token) {
                localStorage.setItem('token', response.token);
    
                this.router.navigate(['/home']);
              }
            }
          });
        
      },
      error: (response) => {
        console.log(response.error.message);
      }
    });
  }

  ngOnInit(): void {}

}
