import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private route: Router,
    private storageService: StorageService // Injeção do StorageService
  ) {
  }

  public async getMenuItems(): Promise<MenuItem[]> {
    const failedReadings = await this.storageService.getFailedReadingItems();
    const failedPhotos = await this.storageService.getFailedPhotoItems();
    
    const totalFailures = (failedReadings?.length || 0) + (failedPhotos?.length || 0);
    const syncCount = totalFailures.toString();
  
    return [
      {
        label: 'Início',
        icon: 'pi pi-home',
        command: () => {
          this.route.navigate(['/', 'Regions']);
        }
      },
      {
        label: 'Historico De Leituras',
        icon: 'pi pi-history',
        badge: syncCount,
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
