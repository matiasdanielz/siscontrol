import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-failed-reading-modal',
  templateUrl: './failed-reading-modal.component.html',
  styleUrl: './failed-reading-modal.component.css',
  providers: [MessageService],
})
export class FailedReadingModalComponent {
  protected pendingUnits: string[] = [];
  protected isModalOpen: boolean = false;
  protected isLoading: boolean = false

  constructor(
    private storageService: StorageService,
    private messageService: MessageService
  ){

  }

  public open(units: string[]) {
    this.pendingUnits = units;
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }

  protected async retryFailedSync(): Promise<void> {
    this.isLoading = true;
    // 1. Tenta atualizar todas as leituras que falharam
    await this.storageService.updateAllFailedReadingItems();
  
    // 2. Busca as leituras que ainda falharam após a tentativa
    const failedReadings = await this.storageService.getFailedReadingItems();
  
    // 3. Cria um Set com as chaves únicas das leituras ainda com falha
    const unprocessedUnits = new Set(
      failedReadings.map(({ idCond, economia }) => `${idCond}-${economia}`)
    );
  
    // 4. Filtra as unidades pendentes que ainda constam como não processadas
    const remainingPending = this.pendingUnits.filter((item) =>
      {
        return unprocessedUnits.has(`${item}`)
      }
    );
  
    // 5. Verifica se ainda existem leituras pendentes
    if (remainingPending.length === 0) {
      this.messageService.add({ severity: "success", summary: "Sucesso", detail: "Todas As Leituras Pendentes Foram Sincronizadas", life: 1000 });
      this.isModalOpen = false;
    } else {
      this.messageService.add({ severity: "error", summary: "Erro", detail: "As leituras ainda não foram sincronizadas", life: 1000 });
    }

    this.isLoading = false;
  }
}
