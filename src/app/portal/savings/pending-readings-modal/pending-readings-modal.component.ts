import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pending-readings-modal',
  templateUrl: './pending-readings-modal.component.html',
  styleUrl: './pending-readings-modal.component.css'
})
export class PendingReadingsModalComponent {
  protected isModalOpen: boolean = false;
  protected pendingUnits: string[] = [];
  protected modalText: string = "";

  @Output() modalResponse = new EventEmitter<boolean>();

  public openPendingReadingsModal(units: string[]) {
    this.pendingUnits = units;
    this.modalText = "Existem leituras pendentes que precisam ser preenchidas antes de sair.";
    this.isModalOpen = true;
  }

  public openReadingsNotFoundInStorageModal(units: string[]) {
    this.pendingUnits = units;
    this.modalText = "Algumas unidades do condomínio atual não foram encontradas no seu historico de leituras (STORAGE)";
    this.isModalOpen = true;
  }

  public closeModal(shouldLeave: boolean) {
    this.isModalOpen = false;
    this.modalResponse.emit(shouldLeave);
  }
}
