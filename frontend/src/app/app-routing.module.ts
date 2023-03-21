import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PropertyRegisterComponent } from './components/property-register/property-register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'register', component: UserRegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'user', component: UserEditComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'property', component: PropertyRegisterComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
