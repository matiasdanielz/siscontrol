import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { PortalComponent } from './portal/portal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Importações Prime-ng
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CondominiumsComponent } from './condominiums/condominiums.component';

@NgModule({
  declarations: [
    PortalComponent,
    NavbarComponent,
    NeighborhoodsComponent,
    CondominiumsComponent
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
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    BadgeModule,
    ProgressBarModule,
    DialogModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    FormsModule
  ]
})
export class PortalModule { }
