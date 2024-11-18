import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CondominiumService {

  private selectedCondominium: string = "";
  private userId: string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedCondominium = params['condominium'];
      this.userId = params['userId'];
    });
  }

  public async getCondominiumValues(): Promise<any>{
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=getCond&idCond=${this.selectedCondominium}&idUsuario=${this.userId}`;

    const response: any = await this.http.get(url).toPromise();

    return response;  
  }

  public async updateReading(item: any): Promise<any> {
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=enviaLeitura`;
    
    try {
      const response: any = await this.http.post(url, item, { responseType: 'text' }).toPromise();

      return response;
    } catch (error) {
      console.error('Erro ao fazer o parsing da resposta:', error);
      return null; // ou o que preferir retornar em caso de erro
    }
  }
}
