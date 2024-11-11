import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected menuItems: MenuItem[] = [];

  constructor(
    private navbarService: NavbarService,
    private route: Router
  ){
    this.menuItems = this.navbarService.getMenuItems();
  }

  protected signOut(){
    this.route.navigate(['/', 'LogIn']);
  }
}
