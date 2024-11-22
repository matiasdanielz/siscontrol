import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class CondominiumsService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService

  ) {
  }
  

  public getCondominiumsColumns(): column[]{
    return [
      {
        property: 'condominio',
        label: 'Condominio'
      },
      {
        property: 'status',
        label: 'Medição'
      },
    ];
  }

  public async getCondominiumsItems(){
    const selectionedRegionId = await this.storageService.getPositionedRegionId();
    const userId = await this.storageService.getUserId();

    const url: string = `https://conline.solucaoadm.com/api_med?metodo=getConds&idRegiao=${selectionedRegionId}&idUsuario=${userId}`;

    const response: any = await this.http.get(url).toPromise();

    return response;        
  }
}
