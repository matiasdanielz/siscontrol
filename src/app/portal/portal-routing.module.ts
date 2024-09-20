import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './invoicing/products/products.component';
import { SalesRequestsComponent } from './invoicing/sales-requests/sales-requests.component';

const routes: Routes = [

  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'Customers',
        component: CustomersComponent
      },
      {
        path: 'Products',
        component: ProductsComponent
      },
      {
        path: 'SalesRequests',
        component: SalesRequestsComponent
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PortalRoutingModule { }
