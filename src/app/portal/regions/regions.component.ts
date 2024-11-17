import { Component, OnInit } from '@angular/core';
import { RegionsService } from './regions.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css'
})
export class RegionsComponent implements OnInit {
  // Tabela Principal
  protected neighborhoodsItems: any[] = [];
  protected neighborhoodsColumns: any[] = [];
  protected filteredNeighborhoods: any[] = [];

  // Overlay de carregamento
  protected isLoading: boolean = true;

  //Filtro da tabela
  protected searchFilter: string = '';

  constructor(
    private neighborhoodsService: RegionsService,
    private route: Router,
    private storage: Storage
  ) {
    this.neighborhoodsColumns = neighborhoodsService.getRegionsColumns();
  }

  async ngOnInit(): Promise<void> {
    this.neighborhoodsItems = await this.neighborhoodsService.getRegionsItems();
    this.filteredNeighborhoods = this.neighborhoodsItems; // Inicia com todos os itens
    this.isLoading = false;
  }

  protected async openNeighborhood(selectedItem: any) {
    const userId: string = await this.storage.get("userId");

    this.route.navigate(['/', 'Condominiums'], {
      queryParams: {
        "neighborhoodId": selectedItem['idRegiao'],
        "userId": userId
      }
    });
  }

  protected filterNeighborhoods() {
    this.filteredNeighborhoods = this.neighborhoodsItems.filter(item =>
      item['regiao'].toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }
}
