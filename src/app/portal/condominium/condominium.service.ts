import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CondominiumService {

  constructor(
    private http: HttpClient
  ) { }

  public async getCondominiumValues(): Promise<any>{
    const url: string = "https://conline.solucaoadm.com/api_med?metodo=getCond&idCond=23&idUsuario=1";

    const response: any = await this.http.get(url).toPromise();

    return response;  
  }
}
