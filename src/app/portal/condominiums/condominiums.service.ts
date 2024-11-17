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
  private userId: string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,

  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedNeighborhood = params['neighborhoodId'];
      this.userId = params['userId'];
    });
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

    const url: string = `/api_med?metodo=getConds&idRegiao=${this.selectedNeighborhood}&idUsuario=${this.userId}`;

    const response: any = await this.http.get(url).toPromise();

    return response;        
  }
}
