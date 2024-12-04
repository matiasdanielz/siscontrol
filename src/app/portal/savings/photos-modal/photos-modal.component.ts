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

  //Controle De Acesso
  protected hasWaterContracted: boolean = false;
  protected hasGasContracted: boolean = false;
  protected waterPhotoIsNull: boolean = false;
  protected gasPhotoIsNull: boolean = false;

  constructor(
    private savingsService: SavingsService,
    private storageService: StorageService,
    private messageService: MessageService,
    ){
  }

  public openPhotoModal(openedUnityInPhotoModal: any){
    this.openedUnityInPhotoModal = openedUnityInPhotoModal;

    this.setControlAcess();

    this.isPhotoModalOpen = true;
  }

  protected setControlAcess(){
    //Se tem agua ou gas contratado
    this.hasWaterContracted = this.openedUnityInPhotoModal['leitura_atual_agua'] != 'nao_possui';
    this.hasGasContracted = this.openedUnityInPhotoModal['leitura_atual_gas'] != 'nao_possui';

    //Se ja tem foto
    this.waterPhotoIsNull = this.openedUnityInPhotoModal['imagem_atual_agua'] == null;
    this.gasPhotoIsNull = this.openedUnityInPhotoModal['imagem_atual_gas'] == null;
  }

  protected async openCamera(consupmitionType: string): Promise<void> {
    try {
      const photo = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if(consupmitionType == 'agua'){
        this.newWaterPhoto = photo.webPath;
        this.openedUnityInPhotoModal['imagem_atual_agua'] = this.newWaterPhoto;
      }else{
        this.newGasPhoto = photo.webPath;
        this.openedUnityInPhotoModal['imagem_atual_gas'] = this.newGasPhoto;
      }

      const blob = await (await fetch(photo.webPath!)).blob();
      const file = new File([blob], 'foto.jpg', { type: blob.type });

      const requestItem = {
        "photo": file,
        "idCond": this.openedUnityInPhotoModal.idCond,
        "economia": this.openedUnityInPhotoModal.economia,
        "tipo_consumo": consupmitionType
      };

      const response: any = await this.savingsService.updatePhoto(requestItem);

      if (response == "offline") {
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
