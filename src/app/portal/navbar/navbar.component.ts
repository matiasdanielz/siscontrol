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

  private failedReadingsSubscription: Subscription | null = null;
  private failedPhotosSubscription: Subscription | null = null;

  constructor(
    private navbarService: NavbarService,
    private route: Router,
    private storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getMenuItems();
    
    // Inscrição para observar mudanças nas falhas de leitura
    this.failedReadingsSubscription = this.storageService.failedReadingsCount$.subscribe(() => {
      this.getMenuItems();
    });

    // Inscrição para observar mudanças nas falhas de fotos
    this.failedPhotosSubscription = this.storageService.failedPhotosCount$.subscribe(() => {
      this.getMenuItems();
    });
  }

  ngOnDestroy(): void {
    if (this.failedReadingsSubscription) {
      this.failedReadingsSubscription.unsubscribe();
    }
    if (this.failedPhotosSubscription) {
      this.failedPhotosSubscription.unsubscribe();
    }
  }

  private async getMenuItems() {
    this.menuItems = await this.navbarService.getMenuItems();
  }

  protected async signOut() {
    await this.storageService.logOutUser();
    this.route.navigate(['/', 'LogIn']);
  }
}
