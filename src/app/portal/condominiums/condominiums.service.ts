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
        label: 'Bairro'
      },
      {
        property: 'utilization',
        label: 'Utilização'
      },
    ];
  }

  public async getCondominiumsItems(){
    const url: string = "https://conline.solucaoadm.com/api_med?metodo=getConds&idRegiao=" + this.selectedNeighborhood + "&idUsuario=1";

    const response: any = await this.http.get(url).toPromise();

    return response;        
  }
}
