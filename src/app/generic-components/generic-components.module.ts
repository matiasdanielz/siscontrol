import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';


@NgModule({
  declarations: [
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    LoadingOverlayComponent // Exporte o componente aqui
  ]
})
export class GenericComponentsModule { }
