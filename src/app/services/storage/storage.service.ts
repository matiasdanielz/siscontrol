import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SavingsService } from '../savings/savings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // Cria um BehaviorSubject para rastrear a contagem de falhas
  private failedReadingsCountSubject = new BehaviorSubject<number>(0);
  public failedReadingsCount$ = this.failedReadingsCountSubject.asObservable(); // Exposição como Observable  
  private count: number = 0;

  constructor(
    private storage: Storage,
    private savingsService: SavingsService
  ) { 
    
  }

  public async updateAllFailedReadingItems() {
    const syncItems = await this.getFailedReadingItems();
    const failedItems: any[] = [];
  
    for (const item of syncItems) {
      try {
        const response = await this.savingsService.updateSaving(item);
        if (response !== 'sucesso"sucesso"') failedItems.push(item);
      } catch {
        await this.addFailedReading(item);
      }
    }
  
    if (failedItems.length == 0) {
      await this.storage.set('failedReadings', []);
    }

    // Atualiza o BehaviorSubject com a nova contagem
    this.updateFailedReadingItemsCount();
  }

  public async addFailedReading(failedReading: any){
    const failedReadings = await this.getFailedReadingItems();

    failedReadings.push(failedReading);
    await this.storage.set('failedReadings', failedReadings);

    this.updateFailedReadingItemsCount();
  }

  private async updateFailedReadingItemsCount(){
    const failedReadings = await this.getFailedReadingItems();

    this.failedReadingsCountSubject.next(failedReadings.length);
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
