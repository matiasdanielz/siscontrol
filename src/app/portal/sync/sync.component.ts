import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SyncComponent implements OnInit {
  
  // Overlay de carregamento
  protected isLoading = true;

  // Tabs do menu
  protected tabItems: MenuItem[] = [
    { label: 'Pendentes', icon: 'pi pi-times-circle' },
    { label: 'Sincronizadas', icon: 'pi pi-check-circle' }
  ];

  // Itens pendentes
  protected pendingItemsFilter = "";
  protected pendingSyncItems: any[] = [];
  protected filteredPendingSyncItems: any[] = [];
  protected amountOfSyncPendencies = '';

  // Itens concluídos
  protected finishedItemsFilter: string = "";
  protected finishedSyncItems: any[] = [];
  protected filteredFinishedSyncItems: any[] = [];

  // Colunas das tabelas
  protected syncColumns: any[] = [];

  constructor(
    private storageService: StorageService,
    private savingsService: SavingsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.syncColumns = await this.savingsService.getSavingColumns();
    await this.loadData();
    this.isLoading = false;
  }

  /**
   * Atualiza todos os dados de sincronização
   */
  protected async loadData(): Promise<void> {
    await Promise.all([
      this.updateSyncPendenciesItems(),
      this.updateFinishedSyncItems()
    ]);
  }

  /**
   * Reprocessa todas as leituras falhadas e recarrega os itens
   */
  protected async retryFailedSync(): Promise<void> {
    this.isLoading = true;
    await this.storageService.updateAllFailedReadingItems();
    await this.loadData();
    this.isLoading = false;
  }

  /**
   * Atualiza os itens pendentes de sincronização
   */
  protected async updateSyncPendenciesItems(): Promise<void> {
    const [failedReadings, failedPhotos] = await Promise.all([
      this.storageService.getFailedReadingItems(),
      this.storageService.getFailedPhotoItems()
    ]);

    this.pendingSyncItems = [...failedReadings, ...failedPhotos];
    this.amountOfSyncPendencies = this.pendingSyncItems.length.toString();
    this.filteredPendingSyncItems = this.pendingSyncItems;
  }

  protected filterPendingSyncItems(): void {
    const filter = this.pendingItemsFilter.toLowerCase();
  
    this.filteredPendingSyncItems = this.pendingSyncItems.filter(item => 
      Object.values(item).some(value => 
        value?.toString().toLowerCase().includes(filter)
      )
    );
  }

  /**
   * Atualiza os itens concluidos
   */
  protected async updateFinishedSyncItems(): Promise<void> {
    const [finishedReadings] = await Promise.all([
      this.storageService.getFinishedReadingItems(),
    ]);

    this.finishedSyncItems = finishedReadings;
    this.filteredFinishedSyncItems = this.finishedSyncItems;
  }

  protected filterFinishedSyncItems(): void {
    const filter = this.finishedItemsFilter.toLowerCase();
  
    this.filteredFinishedSyncItems = this.finishedSyncItems.filter(item => 
      Object.values(item).some(value => 
        value?.toString().toLowerCase().includes(filter)
      )
    );
  }
  
  /**
   * Abre a confirmação para excluir o histórico
   */
  protected openDeletionDialog(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja excluir o histórico?',
      header: 'Exclusão de Histórico',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: async () => {
        await this.storageService.setFinishedReadingItems([]);
        await this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Histórico excluído' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Exclusão cancelada' });
      }
    });
  }
}
