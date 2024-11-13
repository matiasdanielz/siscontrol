import { Component, OnInit } from '@angular/core';
import { NeighborhoodsService } from './neighborhoods.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neighborhoods',
  templateUrl: './neighborhoods.component.html',
  styleUrl: './neighborhoods.component.css'
})
export class NeighborhoodsComponent implements OnInit{
  //Tabela Principal
  protected neighborhoodsItems: any[] = [];
  protected neighborhoodsColumns: any[] = [];

  //Overlay de carregamento
  protected isLoading: boolean = true;

  constructor(
    private neighborhoodsService: NeighborhoodsService,
    private route: Router
  ){
    this.neighborhoodsColumns = neighborhoodsService.getNeighborhoodsColumns();

  }

  async ngOnInit(): Promise<void> {
    this.neighborhoodsItems = await this.neighborhoodsService.getNeighborhoodsItems();

    this.isLoading = false;
  }

  public openNeighborhood(selectedItem: any){
    this.route.navigate(['/', 'Condominiums'], {
      queryParams: {
        "neighborhoodId": selectedItem['idRegiao']
      }
    });
  }
}
