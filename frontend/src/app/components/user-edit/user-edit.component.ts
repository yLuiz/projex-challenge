import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUserRequest, IUserResponse } from 'src/interfaces/user.interface';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user!: IUserResponse;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  editUser(user: IUserRequest) {
    this.userService.update(user)
      .subscribe({
        next: response => {

          this.dialogService.show({
            header: "Atualizado",
            message: "Seu dados foram atualizados com sucesso",
            timer: 2000
          });

          this.userService.sendingUser.next(false);
          this.router.navigate(['/home']);

          console.log(response);
        },
        error: response => {
          console.log(response);
          
        }
      })
  }

  async ngOnInit(): Promise<void> {
    const decodedToken = await this.authService.getDecodedToken();
    
    this.userService.getUserById(decodedToken!.sub).subscribe(userResponse => {
      this.user = userResponse.user;
    })
  }
}
