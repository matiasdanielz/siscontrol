import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pending-readings-modal',
  templateUrl: './pending-readings-modal.component.html',
  styleUrl: './pending-readings-modal.component.css'
})
export class PendingReadingsModalComponent {
  protected isModalOpen: boolean = false;
  protected pendingUnits: string[] = []; // Lista de unidades pendentes

  @Output() modalResponse = new EventEmitter<boolean>();

  public openModal(units: string[]) {
    this.pendingUnits = units; // Armazena as unidades pendentes
    this.isModalOpen = true;
  }

  public closeModal(shouldLeave: boolean) {
    this.isModalOpen = false;
    this.modalResponse.emit(shouldLeave); // Emite a resposta do usuário
  }
}
