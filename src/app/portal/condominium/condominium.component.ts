import { Component, OnInit, ViewChild } from '@angular/core';
import { CondominiumService } from './condominium.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrl: './condominium.component.css'
})
export class CondominiumComponent implements OnInit{
  @ViewChild('overlayPanel', {static: true}) overlayPanel!: OverlayPanel;

  //Itens Da Tabela
  protected condominiumValues: any[] =[];

  //Titulo e Id da Pagina
  protected condominiumTitle: string = "";
  protected condominiumId: string = "";

  //Modal De Alteração De Apartamento
  protected isEditApartmentModalOpen: boolean = false;

  //Overlay de carregamento
  protected isLoading: boolean = true;

  constructor(
    private condomoniumService: CondominiumService
  ){
  }

  async ngOnInit(): Promise<void> {
    this.condominiumValues = await this.condomoniumService.getCondominiumValues();

    this.condominiumTitle = this.condominiumValues[0]['condominio'];
    this.condominiumId = this.condominiumValues[0]['idCond'];

    this.isLoading = false;
  }

  protected openApartmentEditModal(event: any){
    this.overlayPanel.toggle(event);
    //this.isEditApartmentModalOpen = true;
  }
}
