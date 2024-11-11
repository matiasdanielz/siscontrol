import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private route: Router
  ) { }

  public getMenuItems(): MenuItem[]{
    return [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => {
          this.route.navigate(['/', 'Neighborhoods']);
        }
      },
      {
        label: 'Sincronização',
        icon: 'pi pi-sync',
      },
      {
        label: 'FAQ',
        icon: 'pi pi-file',
      },
    ];
  }

  private signOut(){
    this.route.navigate(['/', 'LogIn']);
  }
}
