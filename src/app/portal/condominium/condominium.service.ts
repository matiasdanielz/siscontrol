import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CondominiumService {

  private selectedCondominium: string = ""; 

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedCondominium = params['condominium'];
    });
  }

  public async getCondominiumValues(): Promise<any>{
    const userId: any = sessionStorage.getItem("userId")?.toString();
    const url: string = "https://conline.solucaoadm.com/api_med?metodo=getCond&idCond=" + this.selectedCondominium + "&idUsuario=" + userId;

    const response: any = await this.http.get(url).toPromise();

    return response;  
  }
}
