import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

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
    private storageService: StorageService
  ){
  }

  async ngOnInit(): Promise<void> {
    this.menuItems = await this.navbarService.getMenuItems();

  }

  protected async signOut(){
    await this.storageService.logOutUser();
    this.route.navigate(['/', 'LogIn']);
  }
}
