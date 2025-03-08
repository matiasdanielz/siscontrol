import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { PortalComponent } from './portal/portal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegionsComponent } from './regions/regions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CondominiumsComponent } from './condominiums/condominiums.component';
import { GenericComponentsModule } from '../generic-components/generic-components.module';
import { FaqComponent } from './faq/faq.component';
import { SyncComponent } from './sync/sync.component';
import { SavingsModule } from './savings/savings.module';

//Importações Prime-ng
import { MenubarModule } from 'primeng/menubar';
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
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PortalComponent,
    NavbarComponent,
    RegionsComponent,
    CondominiumsComponent,
    FaqComponent,
    SyncComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MenubarModule,
    AppRoutingModule,
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
    SavingsModule,
    TabMenuModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class PortalModule { }
