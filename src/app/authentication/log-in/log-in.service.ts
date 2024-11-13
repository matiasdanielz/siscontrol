import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(
    private http: HttpClient
  ) { }

  public async LogIn(
    username: string,
    password: string
  ){
    const url: string = 'https://conline.solucaoadm.com/api_med?metodo=efetuaLogin&dadosLogin={"login":"' + username + '","senha":"' + password + '"}';

    console.log(url);

    const response: any = await this.http.get(url).toPromise();

    return response; 
  }
}
