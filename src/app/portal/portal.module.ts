import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { PortalComponent } from './portal/portal.component';
import { NavbarComponent } from './navbar/navbar.component';

//Importações Prime-ng
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';


@NgModule({
  declarations: [
    PortalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MenubarModule,
    AppRoutingModule,
    AvatarModule
  ]
})
export class PortalModule { }
