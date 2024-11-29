import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CondominiumsService } from 'src/app/services/condominiums/condominiums.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-condominiums',
  templateUrl: './condominiums.component.html',
  styleUrl: './condominiums.component.css'
})
export class CondominiumsComponent implements OnInit{
  //Breadcrumb
  protected breadcrumbItems: MenuItem[] = [
    {
      label: 'Regiões',
      routerLink: '/Regions',
    },
    {
      label: 'Condominios',
    }
  ];

  //Nome Da Regiao
  protected regionName: string = '';

  //Tabela Principal
  protected condominiumsItems: any[] = [];
  protected filteredCondominiums: any[] = [];
  protected condominiumsColumns: any[] = [];
  
  //Overlay de carregamento
  protected isLoading: boolean = true;

  //Filtro De Busca
  protected searchFilter: string = '';

  constructor(
    private condominiums: CondominiumsService,
    private route: Router,
    private storage: Storage
  ){
    this.condominiumsColumns = condominiums.getCondominiumsColumns();
  }

  async ngOnInit(): Promise<void> {
    this.condominiumsItems = await this.condominiums.getCondominiumsItems();
    this.filteredCondominiums = this.condominiumsItems;

    this.regionName = this.condominiumsItems[0]['regiao'];

    this.isLoading = false;
  }

  public async openCondominium(selectedItem: any){
    const userId: string = await this.storage.get("userId");

    this.route.navigate(['/', 'Savings'], {
      queryParams: {
        "condominium": selectedItem['idCond'],
        "userId": userId
      }
    });
  }

  protected getStatus(status: string): any {
    switch (status) {
        case 'Pendente':
            return 'warning';
        case 'Concluido':
            return 'success';
        default: ''

    }
  }

  protected filterCondominiums() {
    this.filteredCondominiums = this.condominiumsItems.filter(item =>
      item['condominio'].toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }
}
