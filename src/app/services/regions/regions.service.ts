import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private userId: string = '';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private route: ActivatedRoute
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
    this.userId = await this.storage.get("userId");
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=getRegioes&idUsuario=${this.userId}`;
  
    const response: any = await this.http.get(url).toPromise();
    return response;
  }
}
