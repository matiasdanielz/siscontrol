import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }


  public async getSyncPendenciesItems() {
    const syncItems = await this.storage.get('failedReadings') || []; // Busca os itens de sincronização ou um array vazio caso não exista

    return syncItems;
  }

  public async syncPendencies() {
    const syncItems = await this.getSyncPendenciesItems();
    const failedItems: any[] = [];
  
    for (const item of syncItems) {
      try {
        const response = await this.updateReading(item);
        if (response !== 'sucesso') failedItems.push(item);
      } catch {
        failedItems.push(item);
      }
    }
  
    if (failedItems.length > 0) {
      await this.storage.set('failedReadings', failedItems);
    } else {
      await this.storage.remove('failedReadings');
    }
  }
  
  public async updateReading(item: any): Promise<any> {
    const url: string = `/api_med?metodo=enviaLeitura`;
    
    try {
      const response: any = await this.http.post(url, item, { responseType: 'text' }).toPromise();

      return response;
    } catch (error) {
      console.error('Erro ao fazer o parsing da resposta:', error);
      return null; // ou o que preferir retornar em caso de erro
    }
  }  
}
