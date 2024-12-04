import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

  //Overlay de carregamento
  protected isLoading: boolean = true;

  //Breadcrumb
  protected breadcrumbItems: MenuItem[] = [
    {
      label: 'Leituras Penduradas',
    },
  ];

  // Tabela Principal
  protected syncColumns: any[] = [];
  protected filteredSyncItems: any[] = [];
  protected amountOfSyncPendencies: string = '';

  constructor(
    private storageService: StorageService,
    private savingsService: SavingsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.updateSyncPendencies();

    this.isLoading = false;
  }

  protected async updateSyncPendencies() {
    this.syncColumns = await this.savingsService.getSavingColumns();

    const failedReadings = await this.storageService.getFailedReadingItems();
    const failedPhotos = await this.storageService.getFailedPhotoItems();

    this.filteredSyncItems = [...failedReadings, ...failedPhotos];

    const totalFailures = (failedReadings?.length || 0) + (failedPhotos?.length || 0);
    this.amountOfSyncPendencies = totalFailures.toString();
  }

  protected async updateAllFailedReadingItems() {
    this.isLoading = true;

    await this.storageService.updateAllFailedReadingItems();

    await this.updateSyncPendencies();

    this.isLoading = false;
  }
}
