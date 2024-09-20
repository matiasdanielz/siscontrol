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
        label: 'Clientes',
        icon: 'pi pi-user',
        command: () => {
          this.route.navigate(['/', 'Customers']);
        }
      },
      {
        label: 'Faturamento',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Pedidos De Venda',
            icon: 'pi pi-shop',
            command: () => {
              this.route.navigate(['/', 'SalesRequests']);
            }
          },
          {
            label: 'Produtos',
            icon: 'pi pi-shopping-cart',
            command: () => {
              this.route.navigate(['/', 'Products']);
            }
          },
        ]
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
    this.route.navigate(['/', 'LogIn']);
  }
}
