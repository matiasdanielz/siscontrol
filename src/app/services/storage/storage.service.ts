import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SavingsService } from '../savings/savings.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private savingsService: SavingsService
  ) { }


  public async updateAllFailedReadingItems() {
    const syncItems = await this.getFailedReadingItems();
    const failedItems: any[] = [];
  
    for (const item of syncItems) {
      try {
        const response = await this.savingsService.updateSaving(item);
        if (response !== 'sucesso"sucesso"') failedItems.push(item);
      } catch {
        failedItems.push(item);
      }
    }
  
    if (failedItems.length > 0) {
      await this.storage.set('failedReadings', failedItems);
    } else {
      await this.storage.set('failedReadings', []);
    }
  }

  public async getFailedReadingItems(): Promise<any[]> {
    const failedReadings: any[] = await this.storage.get('failedReadings');
    const response = failedReadings != null ? failedReadings : [];

    return response;
  }

  //Controlar Usuario Posicionado
  public async setUserId(userId: string){
    await this.storage.set('userId', userId);

    return;
  }

  public async getUserId(): Promise<any[]> {
    //this.storage.clear();
    const positionedId: any = await this.storage.get('userId');

    return positionedId;
  }

  public async logOutUser(){
    await this.storage.remove("userId");

    return;
  }

  //Controlar Região Posicionada
  public async setPositionedRegion(positionedRegionId: string){
    await this.storage.set('positionedRegionId', positionedRegionId);

    return;
  }

  public async getPositionedRegionId(): Promise<any[]> {
    const positionedId: any = await this.storage.get('positionedRegionId');

    return positionedId;
  }

}
