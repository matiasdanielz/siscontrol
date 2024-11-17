import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private route: Router,
    private storage: Storage
  ) { }

  public async getMenuItems(): Promise<MenuItem[]>{
    const userId: string = await this.storage.get("userId");

    const syncItems = await this.getSyncItems(); 
    const syncCount = syncItems.length;

    return [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => {
          this.route.navigate(['/', 'Neighborhoods'], {
            queryParams: {
              "userId": userId
            }
          });
        }
      },
      {
        label: 'Sincronização',
        icon: 'pi pi-sync',
        badge: syncCount.toString() || '0',
        command: () => {
          this.route.navigate(['/', 'Sync']);
        }
      },
      {
        label: 'FAQ',
        icon: 'pi pi-file',
        command: () => {
          this.route.navigate(['/', 'Faq']);
        }
      },
    ];
  }

  private async getSyncItems(): Promise<any[]> {
    const failedReadings: any[] = await this.storage.get('failedReadings') || [];

    return failedReadings;
  }
}
