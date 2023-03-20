import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  loginSubscribtion: Subscription = new Subscription();

  loadingLogin: boolean = false;

  login(event: Event) {

    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const email = form.getElementsByTagName('input').namedItem('email')!.value;

    this.loadingLogin = true;
    const password = form.getElementsByTagName('input').namedItem('password')!.value;

    this.loginSubscribtion = this.loginService.login({ email, password })
      .subscribe({
        next: (response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/register']);
          }
          this.loadingLogin = false;
        }),
        error: (response) => {
          this.loadingLogin = false;
          console.log(response.error.message);
        }
      })

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginSubscribtion.unsubscribe();
  }
}
