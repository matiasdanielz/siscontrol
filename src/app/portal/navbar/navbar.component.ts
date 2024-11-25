import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected menuItems: MenuItem[] = [];

  private failedReadingsSubscription: Subscription | null = null; // Atribuindo 'null' inicialmente

  constructor(
    private navbarService: NavbarService,
    private route: Router,
    private storageService: StorageService
  ) {}

  // ngOnInit será responsável por carregar o menu e inscrever-se nas mudanças de falhas
  async ngOnInit(): Promise<void> {
    this.getMenuItems();
    // Inscreve-se no BehaviorSubject para observar a contagem de falhas
    this.failedReadingsSubscription = this.storageService.failedReadingsCount$.subscribe((count) => {
     this.getMenuItems();
    });
  }

  // ngOnDestroy para cancelar a inscrição quando o componente for destruído
  ngOnDestroy(): void {
    if (this.failedReadingsSubscription) {
      this.failedReadingsSubscription.unsubscribe();
    }
  }

  private async getMenuItems(){
    this.menuItems = await this.navbarService.getMenuItems();
  }

  protected async signOut() {
    await this.storageService.logOutUser();
    this.route.navigate(['/', 'LogIn']);
  }
}
