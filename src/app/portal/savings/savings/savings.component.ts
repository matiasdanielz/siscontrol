import { Component, OnInit, ViewChild } from '@angular/core';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { MenuItem, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PhotosModalComponent } from '../photos-modal/photos-modal.component';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';
import { PendingReadingsModalComponent } from '../pending-readings-modal/pending-readings-modal.component';
import { Observable } from 'rxjs';
import { FailedReadingModalComponent } from '../failed-reading-modal/failed-reading-modal.component';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css'],
  providers: [MessageService],
})
export class SavingsComponent implements CanComponentDeactivate, OnInit {
  @ViewChild('appPhotoModal', { static: true }) appPhotoModal!: PhotosModalComponent;
  @ViewChild('pendingReadingsModal', { static: true }) pendingReadingsModal!: PendingReadingsModalComponent;
  @ViewChild('failedReadingdsModal', { static: true }) failedReadingdsModal!: FailedReadingModalComponent;

  protected successfulReadingsCount = 0;
  protected failedReadingsCount = 0;
  protected pendingReadingsCount = 0;

  protected condominiumTitle = "";
  protected condominiumId = "";
  protected condominiumObservation = "";
  protected searchFilter = '';
  protected isLoading = true;
  protected condominiumValues: any[] = [];
  private hasChanges: boolean = false;

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

    this.pendingReadingsCount = this.countPendingReadings();
    this.isLoading = false;
  }

  protected get filteredApartments(): any[] {
    return this.condominiumValues.filter(({ economia }) =>
      economia.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }

  canDeactivate(): boolean | Observable<boolean> {
    return new Observable<boolean>(observer => {
      Promise.all([this.getPendingUnits(), this.hasChanges ? this.getUnprocessedUnits() : Promise.resolve([])])
        .then(([pendingUnits, unprocessedUnits]) => {
          if (pendingUnits.length) {
            this.pendingReadingsModal.openPendingReadingsModal(pendingUnits);
          } else if (unprocessedUnits.length) {
            this.failedReadingdsModal.open(unprocessedUnits);
          } else {
            observer.next(true);
            observer.complete();
            return;
          }
          this.modalResolver = (shouldLeave: boolean) => {
            observer.next(shouldLeave);
            observer.complete();
          };
        });
    });
  }

  private async getPendingUnits(): Promise<string[]> {
    const isReadingPending = (reading: any) =>
      (reading === null || reading === undefined || reading === '') && reading !== 'nao_possui';
    const isPhotoPending = (photo: any, reading: any) => !photo && reading !== 'nao_possui';

    return this.filteredApartments
      .filter(item =>
        isReadingPending(item.leitura_atual_agua) ||
        isReadingPending(item.leitura_atual_gas) ||
        (item.imagem === 'sim' &&
          (isPhotoPending(item.imagem_atual_agua, item.leitura_atual_agua) ||
           isPhotoPending(item.imagem_atual_gas, item.leitura_atual_gas)))
      )
      .map(({ economia }) => `${economia}`);
  }

  private async getUnprocessedUnits(): Promise<string[]> {
    const failed = await this.storageService.getFailedReadingItems();
    const failedSet = new Set(failed.map(({ idCond, economia }) => `${idCond}-${economia}`));

    return this.filteredApartments
      .filter(({ idCond, economia }) => failedSet.has(`${idCond}-${economia}`))
      .map(({ idCond, economia }) => `${idCond}-${economia}`);
  }

  protected handleModalResponse(shouldLeave: boolean): void {
    this.modalResolver?.(shouldLeave);
    this.modalResolver = null;
  }

  protected openPhotoModalComponent(item: any): void {
    this.appPhotoModal.openPhotoModal(item);
  }

  protected async readingChanged(selectedItem: any, { type, value }: { type: string; value: number | string }): Promise<void> {
    if (value !== null && value !== undefined && value !== '') {
      this.hasChanges = true;
  
      const requestJson = {
        idCond: selectedItem.idCond,
        economia: selectedItem.economia,
        leitura_atual: value,
        tipo_consumo: type  // aqui pode ser 'agua', 'aguaq' ou 'gas'
      };
  
      const response = await this.savingsService.updateSaving(requestJson);
  
      if (response !== 'sucesso"sucesso"') {
        await this.storageService.addFailedReading(requestJson);
        this.failedReadingsCount++;
        this.showMessage('error', 'Erro', 'Falha de rede! Leitura armazenada para sincronizar mais tarde.');
      } else {
        const condo = this.condominiumValues.find(c => c.economia === selectedItem.economia);
        if (condo) {
          condo[`leitura_atual_${type}`] = value; // aqui funciona para 'aguaq' também
        }
        await this.storageService.addFinishedReading(requestJson);
        this.successfulReadingsCount++;
      }
    }
  
    this.pendingReadingsCount = this.countPendingReadings();
  }
  

  private countPendingReadings(): number {
    const isPending = (value: any) =>
      value === null || value === undefined || value === '' || value === 'pendente';
  
    return this.condominiumValues.filter(item =>
      isPending(item.leitura_atual_agua) ||
      isPending(item.leitura_atual_aguaq) ||
      isPending(item.leitura_atual_gas)
    ).length;
  }
  

  /** ✅ Novo método para abrir modal de leituras com falha via botão */
  protected async openFailedReadingsModal(): Promise<void> {
    const failedItems = await this.storageService.getFailedReadingItems();
    const unprocessedUnits = failedItems.map(item => `${item.idCond}-${item.economia}`);
    this.failedReadingdsModal.open(unprocessedUnits);
  }

  private showMessage(severity: 'error' | 'success', summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 1000 });
  }

  protected showMultipleBlocks(item: any): boolean {
    const blocks = [
      item['leitura_atual_agua'] !== 'nao_possui',
      item['leitura_atual_aguaq'] !== 'nao_possui',
      item['leitura_atual_gas'] !== 'nao_possui'
    ];
    return blocks.filter(Boolean).length > 1;
  }

  hasOneBlock(item: any): boolean {
    return this.countBlocks(item) === 1;
  }
  
  hasTwoBlocks(item: any): boolean {
    return this.countBlocks(item) === 2;
  }
  
  hasThreeBlocks(item: any): boolean {
    return this.countBlocks(item) === 3;
  }
  
  private countBlocks(item: any): number {
    let count = 0;
    if (item['leitura_atual_agua'] !== 'nao_possui') count++;
    if (item['leitura_atual_gas'] !== 'nao_possui') count++;
    if (item['leitura_anterior_aguaq'] !== 'nao_possui') count++;
    return count;
  }
  
  
}
