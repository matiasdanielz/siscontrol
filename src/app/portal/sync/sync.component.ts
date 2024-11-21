import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.css'
})
export class SyncComponent implements OnInit{

  //Tabela Principal
  protected amountOfSyncPendencies: string = '';

  protected isLoading: boolean = true;

  constructor(
    private storageService: StorageService
  ){
  }

  async ngOnInit(): Promise<void> {
    this.setAmountOfSyncPendencies();

    this.isLoading = false; 
  }

  protected async setAmountOfSyncPendencies(){
    const response: any = await this.storageService.getFailedReadingItems();

    this.amountOfSyncPendencies = response.length.toString();
  }

  protected async updateAllFailedReadingItems(){
    this.isLoading = true;

    await this.storageService.updateAllFailedReadingItems();

    this.setAmountOfSyncPendencies();

    this.isLoading = false;
  }
}
