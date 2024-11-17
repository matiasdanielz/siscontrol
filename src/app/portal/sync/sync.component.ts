import { Component, OnInit } from '@angular/core';
import { SyncService } from './sync.service';

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
    private syncService: SyncService
  ){
  }

  async ngOnInit(): Promise<void> {
    this.setAmountOfSyncPendencies();

    this.isLoading = false; 
  }

  protected async setAmountOfSyncPendencies(){
    const response: any[] = await this.syncService.getSyncPendenciesItems();

    this.amountOfSyncPendencies = response.length.toString();
  }

  protected async syncPendencies(){
    this.isLoading = true;

    await this.syncService.syncPendencies();

    this.setAmountOfSyncPendencies();

    this.isLoading = false;
  }
}
