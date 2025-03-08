import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SavingsService } from '../savings/savings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //Leituras Falhadas
  private failedReadingsCountSubject = new BehaviorSubject<number>(0);
  public failedReadingsCount$ = this.failedReadingsCountSubject.asObservable();

  //Fotos Falhadas
  private failedPhotosCountSubject = new BehaviorSubject<number>(0);
  public failedPhotosCount$ = this.failedPhotosCountSubject.asObservable();

  constructor(
    private storage: Storage,
    private savingsService: SavingsService
  ) {}

  /** Métodos para leituras concluidas **/

  public async getFinishedReadingItems(): Promise<any[]> {
    const finishedReadings = await this.storage.get('finishedReadings');
    return finishedReadings || [];
  }

  public async setFinishedReadingItems(finishedReadings: any[]) {
    await this.storage.set('finishedReadings', finishedReadings);
    //this.finishedReadingsCountSubject.next(finishedReadings.length);
  }

  public async addFinishedReading(finishedReading: any) {
    const finishedReadings = await this.getFinishedReadingItems();
    finishedReadings.push(finishedReading);
    await this.setFinishedReadingItems(finishedReadings);
  }

  /** Métodos para falhas de leitura **/

  public async getFailedReadingItems(): Promise<any[]> {
    const failedReadings = await this.storage.get('failedReadings');
    return failedReadings || [];
  }

  public async setFailedReadingItems(failedReadings: any[]) {
    await this.storage.set('failedReadings', failedReadings);
    this.failedReadingsCountSubject.next(failedReadings.length);
  }

  public async addFailedReading(failedReading: any) {
    const failedReadings = await this.getFailedReadingItems();
    failedReadings.push(failedReading);
    await this.setFailedReadingItems(failedReadings);
  }

  /** Métodos para falhas de envio de fotos **/

  public async getFailedPhotoItems(): Promise<any[]> {
    const failedPhotos = await this.storage.get('failedPhotos');
    return failedPhotos || [];
  }

  public async setFailedPhotoItems(failedPhotos: any[]) {
    await this.storage.set('failedPhotos', failedPhotos);
    this.failedPhotosCountSubject.next(failedPhotos.length);
  }

  public async addFailedPhoto(failedPhoto: any) {
    const failedPhotos = await this.getFailedPhotoItems();
    failedPhotos.push(failedPhoto);
    await this.setFailedPhotoItems(failedPhotos);
  }

  public async updateAllFailedReadingItems() {
    const syncItems = await this.getFailedReadingItems();
    const failedItems = [];

    for (const item of syncItems) {
      try {
        const response = await this.savingsService.updateSaving(item);
        if (response !== 'sucesso"sucesso"') {
          failedItems.push(item);
        }else{
          this.addFinishedReading(item);
        }
      } catch {
        failedItems.push(item);
      }
    }

    await this.setFailedReadingItems(failedItems);
    await this.updateAllFailedPhotoItems(); // Atualizar fotos após leitura
  }

  public async updateAllFailedPhotoItems() {
    const syncPhotos = await this.getFailedPhotoItems();
    const failedPhotos = [];

    for (const photo of syncPhotos) {
      try {
        const response = await this.savingsService.updatePhoto(photo);
        if (response == "offline") {
          failedPhotos.push(photo);
        }
      } catch {
        failedPhotos.push(photo);
      }
    }

    await this.setFailedPhotoItems(failedPhotos);
  }

  /** Métodos de usuário e região **/

  public async setUserId(userId: string) {
    await this.storage.set('userId', userId);
  }

  public async getUserId(): Promise<any> {
    return await this.storage.get('userId');
  }

  public async logOutUser() {
    await this.storage.remove('userId');
  }

  public async setPositionedRegion(positionedRegionId: string) {
    await this.storage.set('positionedRegionId', positionedRegionId);
  }

  public async getPositionedRegionId(): Promise<any> {
    return await this.storage.get('positionedRegionId');
  }
}
