import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { MenuItem } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrl: './condominium.component.css',
  providers: [MessageService],
})
export class CondominiumComponent implements OnInit{
  //Titulo e Id da Pagina
  protected condominiumTitle: string = "";
  protected condominiumId: string = "";
  protected condominiumObservation: string = "";

  //Breadcrumb
  protected items: MenuItem[] = [
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

  //Fotos Da Economia
  protected isPhotoModalOpen: boolean = false;
  protected newPhoto: any = null;
  protected openedUnityInPhotoModal: any = {"economia": ""};

  constructor(
    private savingsService: SavingsService,
    private storageService: StorageService,
    private messageService: MessageService,
  ){
  }

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.savingsService.getSavingItems();
    this.filteredApartments = this.condominiumValues;

    this.condominiumTitle = this.condominiumValues[0]['condominio'];
    this.condominiumId = this.condominiumValues[0]['idCond'];
    this.condominiumObservation = this.condominiumValues[0]['observacao'];

    this.isLoading = false;
  }

  protected filterApartments() {
    this.filteredApartments = this.condominiumValues.filter(item =>
      item['economia'].toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }

  protected async readingChanged(selectedItem: any, newReadingEvent: FocusEvent, readingType: string): Promise<void> {
    const inputElement = newReadingEvent.target as HTMLInputElement;
    const newReading: string = inputElement.value;
  
    const requestJson = {
      "dados": {
        "idCond": selectedItem['idCond'],
        "economia": selectedItem['economia'],
        "leitura_atual": newReading,
        "tipo_consumo": readingType,
      }
    };

    const response = await this.savingsService.updateSaving(requestJson);
  
    if (response !== 'sucesso"sucesso"') {
      await this.storageService.addFailedReading(requestJson);
      this.showError("Falha de rede! Leitura Armazenada para sincronizar mais tarde!");
    }
  }

  public showPhotoModal(openedUnityInPhotoModal: any){
    this.openedUnityInPhotoModal = openedUnityInPhotoModal;
    this.isPhotoModalOpen = true;
  }
  
  public async openCamera() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Usa a câmera do dispositivo
      });
  
      console.log('Foto capturada:', photo);
      // Exemplo de como usar a imagem capturada
      this.newPhoto = photo.webPath; // URL da imagem para exibir na tela
    } catch (error) {
      console.error('Erro ao abrir a câmera:', error);
    }
  }

  protected onHidePhotoModal(){
    this.newPhoto = null;
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