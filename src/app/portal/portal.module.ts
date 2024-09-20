import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { PortalComponent } from './portal/portal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './invoicing/products/products.component';
import { SalesRequestsComponent } from './invoicing/sales-requests/sales-requests.component';

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


@NgModule({
  declarations: [
    PortalComponent,
    NavbarComponent,
    CustomersComponent,
    ProductsComponent,
    SalesRequestsComponent
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
    ProgressBarModule
  ]
})
export class PortalModule { }
