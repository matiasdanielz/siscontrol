import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { PageDefaultComponent } from './page-default/page-default.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Importações Primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  declarations: [
    LoadingOverlayComponent,
    PageDefaultComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
    LoadingOverlayComponent,
    PageDefaultComponent
  ]
})
export class GenericComponentsModule { }
