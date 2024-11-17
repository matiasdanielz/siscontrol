import { Component, OnInit } from '@angular/core';
import { CondominiumService } from './condominium.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrl: './condominium.component.css'
})
export class CondominiumComponent implements OnInit{
  //Itens Da Tabela
  protected condominiumValues: any[] =[];
  protected filteredApartments: any[] = [];

  //Titulo e Id da Pagina
  protected condominiumTitle: string = "";
  protected condominiumId: string = "";

  //Overlay de carregamento
  protected isLoading: boolean = true;

  //Filtro De Busca
  protected searchFilter: string = '';

  constructor(
    private condomoniumService: CondominiumService,
    private storage: Storage
  ){
  }

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.condomoniumService.getCondominiumValues();
    this.filteredApartments = this.condominiumValues;

    this.condominiumTitle = this.condominiumValues[0]['condominio'];
    this.condominiumId = this.condominiumValues[0]['idCond'];

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
  
    const formData = new FormData();
    formData.append('dados', `{"idCond": "${selectedItem['idCond']}", "economia": "${selectedItem['economia']}", "leitura_atual": "${newReading}", "tipo_consumo": "${readingType}"}`);
  
    const response = await this.condomoniumService.updateReading(formData);
  
    if (response === 'sucesso"sucesso"') {
      return;
    } else {
      console.log("Chamada falhou");

      await this.storeFailedReading(formData);
    }
  }
  
  private async storeFailedReading(formData: FormData): Promise<void> {
    try {
      const failedReadings = JSON.parse(await this.storage.get('failedReadings')) || [];
  
      const formDataObject = this.formDataToObject(formData);
  
      failedReadings.push(formDataObject);

      await this.storage.set('failedReadings', JSON.stringify(failedReadings));
  
      console.log("Falha armazenada no storage");
    } catch (error) {
      console.error("Erro ao armazenar falha no storage", error);
    }
  }
  
  private formDataToObject(formData: FormData): object {
    const obj: any = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  
}
