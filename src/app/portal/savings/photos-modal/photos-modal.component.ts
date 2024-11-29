import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MessageService } from 'primeng/api';
import { SavingsService } from 'src/app/services/savings/savings.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-photos-modal',
  templateUrl: './photos-modal.component.html',
  styleUrl: './photos-modal.component.css',
  providers: [MessageService],
})
export class PhotosModalComponent {
  //Fotos Da Economia
  protected isPhotoModalOpen: boolean = false;
  protected newWaterPhoto: any = null;
  protected newGasPhoto: any = null;
  protected openedUnityInPhotoModal: any = { "economia": '', idCond: '', "imagem_atual_agua": null, "imagem_atual_gas": null };

  constructor(
    private savingsService: SavingsService,
    private storageService: StorageService,
    private messageService: MessageService,
    ){
  }

  public openPhotoModal(openedUnityInPhotoModal: any){
    this.openedUnityInPhotoModal = openedUnityInPhotoModal;
    this.isPhotoModalOpen = true;
  }

  protected async openCamera(consupmitionType: string): Promise<void> {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if(consupmitionType == 'agua'){
        this.newWaterPhoto = photo.webPath;
        this.openedUnityInPhotoModal['imagem_atual_agua'] = "preenchido";
      }else{
        this.newGasPhoto = photo.webPath;
        this.openedUnityInPhotoModal['imagem_atual_gas'] = "preenchido";
      }

      const blob = await (await fetch(photo.webPath!)).blob();
      const file = new File([blob], 'foto.jpg', { type: blob.type });

      const requestItem = {
        photo: file,
        condominiumId: this.openedUnityInPhotoModal.idCond,
        savingId: this.openedUnityInPhotoModal.economia,
        consupmitionType: consupmitionType
      };

      const response: any = "";//await this.savingsService.updatePhoto(requestItem);

      if (response !== 'Upload da foto realizado com sucesso!"sucesso"') {
        await this.storageService.addFailedPhoto(requestItem);
        this.showError("Falha de rede! Leitura armazenada para sincronizar mais tarde.");
      }

    } catch (error) {
      console.error('Erro ao abrir a câmera:', error);
    }
  }

  protected onHidePhotoModal(){
    this.newGasPhoto = null;
    this.newWaterPhoto = null;
  }
  
  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 1000,
    });
  }
}
