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
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Features',
        icon: 'pi pi-star'
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            separator: true
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2'
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3'
              }
            ]
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: '3'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        badge: '3',
        command: () => {
          this.signOut();
        }
      }
    ];
  }

  private signOut(){
    this.route.navigate(['/', 'LogIn'])
  }
}
