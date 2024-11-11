import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CondominiumsService } from './condominiums.service';

@Component({
  selector: 'app-condominiums',
  templateUrl: './condominiums.component.html',
  styleUrl: './condominiums.component.css'
})
export class CondominiumsComponent implements OnInit{
  //Tabela Principal
  protected condominiumsItems: any[] = [];
  protected condominiumsColumns: any[] = [];

  constructor(
    private condominiums: CondominiumsService,
    private route: Router
  ){
    this.condominiumsColumns = condominiums.getCondominiumsColumns();
  }

  async ngOnInit(): Promise<void> {
    this.condominiumsItems = await this.condominiums.getCondominiumsItems();
  }

  public openCondominium(){
    this.route.navigate(['/', 'Condominiums']);
  }
}