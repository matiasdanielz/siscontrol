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
  styleUrl: './savings.component.css',
  providers: [MessageService],
})
export class SavingsComponent implements CanComponentDeactivate, OnInit {
  @ViewChild('appPhotoModal', { static: true }) appPhotoModal!: PhotosModalComponent;
  @ViewChild('pendingReadingsModal', { static: true }) pendingReadingsModal!: PendingReadingsModalComponent;
  @ViewChild('failedReadingdsModal', { static: true }) failedReadingdsModal!: FailedReadingModalComponent;

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
  ) { }

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.savingsService.getSavingItems();
    const { condominio, idCond, observacao } = this.condominiumValues[0] || {};
    Object.assign(this, { condominiumTitle: condominio, condominiumId: idCond, condominiumObservation: observacao });
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
    const unprocessedUnits = new Set(
      [
        ...(await this.storageService.getFailedReadingItems()),
      ].map(({ idCond, economia }) => `${idCond}-${economia}`)
    );

    return this.filteredApartments
      .filter(({ idCond, economia }) => {
        return unprocessedUnits.has(`${idCond}-${economia}`)
      })
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
        await this.storageService.addFinishedReading(requestJson);
      }
    }
  }

  private showMessage(severity: 'error' | 'success', summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 1000 });
  }
}
