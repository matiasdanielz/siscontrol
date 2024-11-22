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
export class RegionsService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { 
  }


  public getRegionsColumns(): column[]{
    return [
      {
        property: 'regiao',
        label: 'Região'
      },
      {
        property: 'readings',
        label: 'Leituras'
      },
    ];
  }

  public async getRegionsItems() {
    const userId = await this.storageService.getUserId();
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=getRegioes&idUsuario=${userId}`;
  
    const response: any = await this.http.get(url).toPromise();
    return response;
  }
}
