import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private route: Router,
    private storage: Storage,
    private storageService: StorageService
  ) { }

  public async getMenuItems(): Promise<MenuItem[]>{
    const userId: string = await this.storage.get("userId");

    const syncItems = await this.storageService.getFailedReadingItems();
    const syncCount: string = syncItems == null ? "0" : syncItems.length.toString();

    return [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => {
          this.route.navigate(['/', 'Regions'], {
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
}
