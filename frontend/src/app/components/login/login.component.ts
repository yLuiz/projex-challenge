import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  login(event: Event) {

    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const email = form.getElementsByTagName('input').namedItem('email')!.value;
    const password = form.getElementsByTagName('input').namedItem('password')!.value;

    console.log({
      email,
      password
    })
  }

  ngOnInit(): void {}
}
