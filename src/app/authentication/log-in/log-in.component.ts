import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './log-in.service';
import { MessageService } from 'primeng/api';
import { Storage } from '@ionic/storage-angular';

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
    private messageService: MessageService,
    private storage: Storage
  ){
    this.initStorage();
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  async initStorage() {
    await this.storage.create();
  }

  protected async logIn(): Promise<void> {
    this.isLoading = true;
    
    try {
      const response = await this.logInService.LogIn(this.username, this.password);
  
      if (response && Array.isArray(response) && response.length > 0) {
        const userId: string = response[0]['idUsuario'];
  
        await this.setSessionData(userId);
  
        this.route.navigate(['', 'Regions'], {
          queryParams: { userId }
        });
      } else {
        this.handleLoginError();
      }
    } catch (error) {
      console.error('Erro ao realizar o login', error);
      this.handleLoginError();
    } finally {
      this.isLoading = false;
    }
  }
  
  private async setSessionData(userId: string): Promise<void> {
    try {
      await Promise.all([
        this.storage.set('isLoggedIn', 'true'),
        this.storage.set('userId', userId),
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados na sessão', error);
    }
  }
  
  private handleLoginError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Usuário Não Autenticado!',
      life: 5000,
    });
  }
  
}
