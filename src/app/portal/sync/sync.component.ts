import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

  // Tabela Principal
  protected amountOfSyncPendencies: string = '';
  protected isLoading: boolean = true;

  constructor(
    private storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setAmountOfSyncPendencies();
    this.isLoading = false;
  }

  protected async setAmountOfSyncPendencies() {
    const failedReadings = await this.storageService.getFailedReadingItems();
    const failedPhotos = await this.storageService.getFailedPhotoItems();

    console.log(failedPhotos);
    console.log(failedReadings);
    
    const totalFailures = (failedReadings?.length || 0) + (failedPhotos?.length || 0);
    this.amountOfSyncPendencies = totalFailures.toString();
  }

  protected async updateAllFailedReadingItems() {
    this.isLoading = true;

    await this.storageService.updateAllFailedReadingItems();

    await this.setAmountOfSyncPendencies();

    this.isLoading = false;
  }
}
