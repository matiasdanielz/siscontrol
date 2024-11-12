import { Component, OnInit, ViewChild } from '@angular/core';
import { CondominiumService } from './condominium.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrl: './condominium.component.css'
})
export class CondominiumComponent implements OnInit{

  //Itens Da Tabela
  protected condominiumValues: any[] =[];

  //Titulo e Id da Pagina
  protected condominiumTitle: string = "";
  protected condominiumId: string = "";

  //Modal De Alteração De Apartamento
  protected isEditApartmentModalOpen: boolean = false;

  constructor(
    private condomoniumService: CondominiumService
  ){
  }

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.condomoniumService.getCondominiumValues();

    this.condominiumTitle = this.condominiumValues[0]['condominio'];
    this.condominiumId = this.condominiumValues[0]['idCond'];
  }

  protected openApartmentEditModal(){
    this.isEditApartmentModalOpen = true;
  }
}
