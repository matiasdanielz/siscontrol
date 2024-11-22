import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './services/storage/storage.service';
import { Platform } from '@ionic/angular'; // ou @capacitor/platform para projetos mais novos
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private storage: Storage,
    private storageService: StorageService,
    private platform: Platform,
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    //this.storage.clear();
  }

  async ngOnInit(): Promise<void> {
    this.initializeApp();
    const isLoggedIn = await this.storageService.getUserId();

    if (isLoggedIn == null) {
      this.router.navigate(['', 'LogIn']);
    } else {
      this.router.navigate(['', 'Regions']);
    }
  }

  protected initializeApp() {
    this.platform.ready().then(() => {
      App.addListener('backButton', async (data) => {
        // Verifique se existe uma rota anterior
        const isLoggedIn = await this.storageService.getUserId();
        if (isLoggedIn && this.router.url !== '/LogIn') { // Substitua "/home" pela sua página inicial
          this.router.navigate(['/Regions']); // Navega para a página anterior
        } else {
          App.exitApp(); // Fecha o aplicativo, se estiver na página inicial
        }
      });
    });
  }
}
