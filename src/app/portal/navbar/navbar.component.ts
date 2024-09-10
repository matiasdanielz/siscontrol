import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected menuItems: MenuItem[] = [];

  constructor(
    private navbarService: NavbarService
  ){
    this.menuItems = this.navbarService.getMenuItems();
  }
}
