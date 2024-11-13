import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './log-in.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  providers: [MessageService]
})
export class LogInComponent implements OnInit{
  //Campos de login
  protected username: string = "";
  protected password: string = "";

  //Overlay de carregamento
  protected isLoading: boolean = true;

  constructor(
    private route: Router,
    private logInService: LogInService,
    private messageService: MessageService
  ){

  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  protected async logIn() {
    this.isLoading = true;

    const response = await this.logInService.LogIn(this.username, this.password);
    
    if (response != null) {
      // Armazena o status do usuário logado na sessão
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userId', response[0]['idUsuario']);
      sessionStorage.setItem('username', this.username); // opcional, se quiser armazenar o nome do usuário

      console.log(response['idUsuario']);

      this.route.navigate(['', 'Neighborhoods']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuario Não Autenticado!',
        life: 5000,
      });
    }

    this.isLoading = false;
  }
}
