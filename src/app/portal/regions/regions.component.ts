import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegionsService } from 'src/app/services/regions/regions.service';
import { MenuItem } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.css'
})
export class RegionsComponent implements OnInit {
  //Breadcrumb
  protected breadcrumbItems: MenuItem[] = [
    {
      label: 'Regiões'
    }
  ];

  protected selectedItem: any;

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
    private storageService: StorageService
  ) {
    this.neighborhoodsColumns = neighborhoodsService.getRegionsColumns();
  }

  async ngOnInit(): Promise<void> {
    this.neighborhoodsItems = await this.neighborhoodsService.getRegionsItems();
    this.filteredNeighborhoods = this.neighborhoodsItems; // Inicia com todos os itens
    this.isLoading = false;
  }

  protected openRegion(selectedItem: any) {
    this.storageService.setPositionedRegion(selectedItem['idRegiao']);

    this.route.navigate(['/', 'Condominiums']);
  }

  protected filterItems() {
    this.filteredNeighborhoods = this.neighborhoodsItems.filter(item =>
      item['regiao'].toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }
}
