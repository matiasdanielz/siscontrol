import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { MenuItem } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrl: './condominium.component.css'
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

  constructor(
    private savingsService: SavingsService,
    private storage: Storage,
    private storageService: StorageService,
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
      await this.storeFailedReading(requestJson);
    }
  }
  
  private async storeFailedReading(failedReading: any): Promise<void> {
    try {
      let failedReadings = await this.storageService.getFailedReadingItems();
  
      failedReadings.push(failedReading);
  
      await this.storage.set('failedReadings', failedReadings);
    } catch (error) {
      console.error('Erro ao armazenar a leitura falha:', error);
    }
  }
}