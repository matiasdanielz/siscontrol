import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  protected menuItems: MenuItem[] = [];

  constructor(
    private navbarService: NavbarService,
    private route: Router,
    private storage: Storage
  ){
  }

  async ngOnInit(): Promise<void> {
    this.menuItems = await this.navbarService.getMenuItems();

  }

  protected async signOut(){
    await this.storage.remove("isLoggedIn");
    this.route.navigate(['/', 'LogIn']);
  }
}
