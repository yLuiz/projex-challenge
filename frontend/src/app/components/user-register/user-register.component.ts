import { Component, OnInit } from '@angular/core';
import { IUserRequest } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor() { }

  registerUser(user: IUserRequest) {
    console.log(user);
  }

  ngOnInit(): void {}

}
