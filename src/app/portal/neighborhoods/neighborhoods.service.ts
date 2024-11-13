import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodsService {

  constructor(
    private http: HttpClient
  ) { }

  public getNeighborhoodsColumns(): column[]{
    return [
      {
        property: 'regiao',
        label: 'Região'
      },
      {
        property: 'utilization',
        label: 'Utilização'
      },
    ];
  }

  public async getNeighborhoodsItems(){
    const userId: any = sessionStorage.getItem("userId")?.toString();
    const url: string = "https://conline.solucaoadm.com/api_med?metodo=getRegioes&idUsuario=" + userId;

    const response: any = await this.http.get(url).toPromise();

    return response;
  }
}
