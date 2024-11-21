import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SavingsService } from '../savings/savings.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private savingsService: SavingsService
  ) { }


  public async updateAllFailedReadingItems() {
    const syncItems = await this.getFailedReadingItems();
    const failedItems: any[] = [];
  
    for (const item of syncItems) {
      try {
        const response = await this.savingsService.updateSaving(item);
        if (response !== 'sucesso') failedItems.push(item);
      } catch {
        failedItems.push(item);
      }
    }
  
    if (failedItems.length > 0) {
      await this.storage.set('failedReadings', failedItems);
    } else {
      await this.storage.remove('failedReadings');
    }
  }

  public async getFailedReadingItems(): Promise<any[]> {
    const failedReadings: any = JSON.parse(await this.storage.get('failedReadings'));

    return failedReadings;
  }
}
