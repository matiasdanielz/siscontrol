import { Component, OnInit, ViewChild } from '@angular/core';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { MenuItem, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PhotosModalComponent } from '../photos-modal/photos-modal.component';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';
import { PendingReadingsModalComponent } from '../pending-readings-modal/pending-readings-modal.component';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css',
  providers: [MessageService],
})
export class SavingsComponent implements CanComponentDeactivate, OnInit {
  @ViewChild('appPhotoModal', { static: true }) appPhotoModal!: PhotosModalComponent;
  @ViewChild('pendingReadingsModal', { static: true }) pendingReadingsModal!: PendingReadingsModalComponent;

  protected condominiumTitle = "";
  protected condominiumId = "";
  protected condominiumObservation = "";
  protected searchFilter = '';
  protected isLoading = true;
  protected condominiumValues: any[] = [];

  private modalResolver: ((value: boolean) => void) | null = null;

  protected breadcrumbItems: MenuItem[] = [
    { label: 'Regiões', routerLink: '/Regions' },
    { label: 'Condomínios', routerLink: '/Condominiums' },
    { label: 'Economias' }
  ];

  constructor(
    private savingsService: SavingsService,
    private storageService: StorageService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.savingsService.getSavingItems();
    const { condominio, idCond, observacao } = this.condominiumValues[0] || {};
    Object.assign(this, { condominiumTitle: condominio, condominiumId: idCond, condominiumObservation: observacao });
    this.isLoading = false;
  }

  // Getter para obter a lista filtrada dinamicamente
  protected get filteredApartments(): any[] {
    return this.condominiumValues.filter(({ economia }) =>
      economia.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }

  // Modificar o canDeactivate para retornar apenas boolean ou Observable<boolean>
  canDeactivate(): boolean | Observable<boolean> {
    // Usar um Observable diretamente para lidar com a lógica assíncrona
    return new Observable<boolean>(observer => {
      // Chama o método getPendingUnits e verifica se há unidades pendentes
      this.getPendingUnits().then(pendingUnits => {
        if (pendingUnits.length) {
          // Se houver unidades pendentes, abrir o modal e aguardar a resposta
          this.pendingReadingsModal.openModal(pendingUnits);
          // Resolva a promessa quando o modal for respondido
          this.modalResolver = (shouldLeave: boolean) => {
            observer.next(shouldLeave); // Passa o resultado para o observer
            observer.complete(); // Completa o Observable
          };
        } else {
          // Caso não haja unidades pendentes, permite a navegação
          observer.next(true);
          observer.complete();
        }
      });
    });
  }
  
  private async getPendingUnits(): Promise<string[]> {
    // Função para criar chave única (idCond + economia + tipo_consumo)
    const createUniqueKey = (idCond: string, economia: string, tipo_consumo: string) => `${idCond}-${economia}-${tipo_consumo}`;
  
    // Funções de validação de leitura e foto pendente
    const isReadingPending = (reading: any) => !reading || reading === 'nao_possui';
    const isPhotoPending = (photo: any, reading: any) => !photo && reading !== 'nao_possui';
  
    // Obter leituras falhadas e bem-sucedidas do Storage
    const [failedReadings, finishedReadings] = await Promise.all([
      this.storageService.getFailedReadingItems(),
      this.storageService.getFinishedReadingItems(),
    ]);
  
    // Criar as chaves únicas para leituras falhadas e bem-sucedidas
    const processedUnits = [
      ...failedReadings,
      ...finishedReadings,
    ].map(({ idCond, economia, tipo_consumo }) => createUniqueKey(idCond, economia, tipo_consumo));
  
    // Filtrar e mapear as unidades pendentes da tela
    const pendingUnits = this.filteredApartments
      .filter(item =>
        isReadingPending(item.leitura_atual_agua) || 
        isReadingPending(item.leitura_atual_gas) || 
        (item.imagem === 'sim' && 
          (isPhotoPending(item.imagem_atual_agua, item.leitura_atual_agua) || 
           isPhotoPending(item.imagem_atual_gas, item.leitura_atual_gas)))
      )
      .map(({ idCond, economia, tipo_consumo }) => createUniqueKey(idCond, economia, tipo_consumo));
  
    // Remover duplicatas e retornar apenas as economias
    return [...new Set(pendingUnits.filter(unit => !processedUnits.includes(unit)))].map(unit => unit.split('-')[1]);
  }  
  
  protected handleModalResponse(shouldLeave: boolean): void {
    this.modalResolver?.(shouldLeave);
    this.modalResolver = null;
  }

  protected openPhotoModalComponent(item: any): void {
    this.appPhotoModal.openPhotoModal(item);
  }

  protected async readingChanged(selectedItem: any, { type, value }: { type: string; value: number | string }): Promise<void> {
    const requestJson = {
      idCond: selectedItem.idCond,
      economia: selectedItem.economia,
      leitura_atual: value,
      tipo_consumo: type
    };

    const response = await this.savingsService.updateSaving(requestJson);

    if (response !== 'sucesso"sucesso"') {
      await this.storageService.addFailedReading(requestJson);
      this.showMessage('error', 'Erro', 'Falha de rede! Leitura armazenada para sincronizar mais tarde.');
    } else {
      const condo = this.condominiumValues.find(condo => condo.economia === selectedItem.economia);
      if (condo) {
        condo[`leitura_atual_${type}`] = value;
      }

      console.log(requestJson)

      await this.storageService.addFinishedReading(requestJson);
    }
  }

  private showMessage(severity: 'error' | 'success', summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 1000 });
  }
}
