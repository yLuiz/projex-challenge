import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
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

    if (!email || !password) {

      this.dialogService.show({
        header: "Campos inválidos",
        message: "Email e senha são obrigatórios",
        timer: 3000,
        type: "error"
      });
      
      this.loadingLogin = false;
      return;
    }

    this.loginSubscribtion = this.authService.login({ email, password })
      .subscribe({
        next: (response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            
            this.dialogService.show({
              header: "Sucesso",
              message: "Logado com sucesso",
              timer: 2000
            });

            setTimeout(() => {
              this.router.navigate(['/home'], {
                state: {
                  myState: "My State"
                }
              });
            }, 1000);
          }
          this.loadingLogin = false;
        }),
        error: (response) => {
          this.loadingLogin = false;

          this.dialogService.show({
            header: "Erro",
            message: "Credências inválidas.",
            type: "error",
            timer: 2000
          });
          console.log(response.error.message);
        }
      })

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginSubscribtion.unsubscribe();
  }
}
