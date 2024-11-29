import { Component, OnInit, ViewChild } from '@angular/core';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { MenuItem } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MessageService } from 'primeng/api';
import { PhotosModalComponent } from '../photos-modal/photos-modal.component';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css',
  providers: [MessageService],
})
export class SavingsComponent {
  @ViewChild('appPhotoModal', {static: true}) appPhotoModal!: PhotosModalComponent;

  //Titulo e Id da Pagina
  protected condominiumTitle: string = "";
  protected condominiumId: string = "";
  protected condominiumObservation: string = "";

  //Breadcrumb
  protected breadcrumbItems: MenuItem[] = [
    {
      label: 'Regiões',
      routerLink: '/Regions',
    },
    {
      label: 'Condominios',
      routerLink: '/Condominiums',
    },
    {
      label: 'Economias'
    }
  ];

  //Itens Da Tabela
  protected condominiumValues: any[] =[];
  protected filteredApartments: any[] = [];

  //Overlay de carregamento
  protected isLoading: boolean = true;

  //Filtro De Busca
  protected searchFilter: string = '';

  constructor(
    private savingsService: SavingsService,
    private storageService: StorageService,
    private messageService: MessageService,
  ){
  }

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.savingsService.getSavingItems();
    this.filteredApartments = [...this.condominiumValues];
    const { condominio, idCond, observacao } = this.condominiumValues[0];
    this.condominiumTitle = condominio;
    this.condominiumId = idCond;
    this.condominiumObservation = observacao;
    this.isLoading = false;
  }

  protected openPhotoModalComponent(item: any){
    this.appPhotoModal.openPhotoModal(item);
  }

  protected filterApartments(): void {
    const lowerSearch = this.searchFilter.toLowerCase();
    this.filteredApartments = this.condominiumValues.filter(({ economia }: any) =>
      economia.toLowerCase().includes(lowerSearch)
    );
  }

  protected async readingChanged(selectedItem: any, newReading: { type: string, value: number | string }): Promise<void> {
    const { type, value } = newReading;

    const requestJson = {
      dados: {
        idCond: selectedItem.idCond,
        economia: selectedItem.economia,
        leitura_atual: value,
        tipo_consumo: type
      }
    };

    const response = await this.savingsService.updateSaving(requestJson);

    if (response !== 'sucesso') {
      await this.storageService.addFailedReading(requestJson);
      this.showError("Falha de rede! Leitura armazenada para sincronizar mais tarde.");
    }
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 1000,
    });
  }
}
