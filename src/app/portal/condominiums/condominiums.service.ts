import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class CondominiumsService {

  private selectedNeighborhood: string = ""; 

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedNeighborhood = params['neighborhoodId'];
    });
  }
  

  public getCondominiumsColumns(): column[]{
    return [
      {
        property: 'condominio',
        label: 'Condominio'
      },
      {
        property: 'utilization',
        label: 'Utilização'
      },
    ];
  }

  public async getCondominiumsItems(){
    const userId: any = sessionStorage.getItem("userId")?.toString();
    const url: string = "https://conline.solucaoadm.com/api_med?metodo=getConds&idRegiao=" + this.selectedNeighborhood + "&idUsuario=" + userId;

    const response: any = await this.http.get(url).toPromise();

    return response;        
  }
}
