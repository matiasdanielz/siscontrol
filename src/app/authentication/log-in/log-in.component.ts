import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './log-in.service';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  providers: [MessageService],
})
export class LogInComponent implements OnInit {
  protected username = '';
  protected password = '';
  protected isLoading = true;

  constructor(
    private router: Router,
    private logInService: LogInService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {

    this.isLoading = false;
  }

  protected async logIn(): Promise<void> {
    this.isLoading = true;

    try {
      const response = await this.logInService.LogIn(this.username, this.password);

      if (response?.length) {
        const userId = response[0]['idUsuario'];
        await this.storageService.setUserId(userId);

        this.router.navigate(['', 'Regions']);
      } else {
        this.showError('Usuário Não Autenticado!');
      }
    } catch {
      this.showError('Usuário Não Autenticado!');
    } finally {
      this.isLoading = false;
    }
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 5000,
    });
  }
}
