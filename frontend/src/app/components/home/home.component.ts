import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public menuService: MenuService,
    private authService: AuthService,
  ) { }

  visible: boolean = false;

  openMenu() {

    this.menuService.visible.next(true);

    this.menuService.class = "show";
  }

  closeMenu() {

    this.menuService.class = "hide";

    setTimeout(() => this.menuService.visible.next(false), 500)
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void { 

    this.menuService.visible.subscribe(visible => {
      this.visible = visible;
    })
  }
}
