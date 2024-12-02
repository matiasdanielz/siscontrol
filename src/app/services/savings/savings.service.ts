import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

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

  public async getSavingItems(): Promise<any>{
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=getCond&idCond=${this.selectedCondominium}&idUsuario=${this.userId}`;

    const response: any = await this.http.get(url).toPromise();

    return response;  
  }

  public async updateSaving(item: any): Promise<any> {
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=enviaLeitura`;
  
    // Converte o objeto para FormData
    let formData: any = new FormData();
    formData.append('dados', JSON.stringify(item.dados)); // Formato esperado no body
  
    try {
      const response: any = await this.http.post(url, formData, { responseType: 'text' }).toPromise();
  
      // Ignora respostas de preflight
      if (response && response.toLowerCase().includes('preflight')) {
        console.warn('Resposta preflight ignorada:', response);
        return null;
      }
  
      return response;
    } catch (error) {
      console.error('Erro ao fazer o parsing da resposta:', error);
      return null;
    }
  }
  
  public async updatePhoto(item: any){
    const url: string = `https://conline.solucaoadm.com/api_med?metodo=enviaFoto&idCond=${item['condominiumId']}&numeroEconomia=${item['savingId']}&tipoConsumo=${item['consupmitionType']}`;
  
    let formData: any = new FormData();
    formData.append('imagem', item['photo']);
  
    try {
      const response: any = await this.http.post(url, formData, { responseType: 'text' }).toPromise();
  
      if (response && response.toLowerCase().includes('preflight')) {
        console.warn('Resposta preflight ignorada:', response);
        return null;
      }
  
      return response;
    } catch (error) {
      console.error('Erro ao fazer o parsing da resposta:', error);
      return null;
    }
  }
  
}
