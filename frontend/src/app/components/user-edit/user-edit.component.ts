import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRequest, IUserResponse } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user!: IUserResponse;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  editUser(user: IUserRequest) {
    console.log("testes")
    console.log(user)
  }

  async ngOnInit(): Promise<void> {
    const decodedToken = await this.authService.getDecodedToken();
    
    this.userService.getUserById(decodedToken!.sub).subscribe(userResponse => {
      console.log(userResponse.user)
      this.user = userResponse.user;
    })
  }
}
