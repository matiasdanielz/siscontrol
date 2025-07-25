import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavingsComponent } from './savings/savings.component';
import { GenericComponentsModule } from 'src/app/generic-components/generic-components.module';
import { PhotosModalComponent } from './photos-modal/photos-modal.component';
import { ReadingBlockComponent } from './reading-block/reading-block.component';
import { PendingReadingsModalComponent } from './pending-readings-modal/pending-readings-modal.component';
import { FailedReadingModalComponent } from './failed-reading-modal/failed-reading-modal.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importações Prime-ng
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ScrollTopModule } from 'primeng/scrolltop';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    SavingsComponent,
    PhotosModalComponent,
    ReadingBlockComponent,
    PendingReadingsModalComponent,
    FailedReadingModalComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    TableModule,
    CardModule,
    PanelModule,
    ButtonModule,
    ProgressBarModule,
    DialogModule,
    BrowserAnimationsModule,
    DataViewModule,
    FormsModule,
    GenericComponentsModule,
    OverlayPanelModule,
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ScrollTopModule,
    InputNumberModule,
    TabViewModule,
    ToastModule
  ]
})
export class SavingsModule { }
