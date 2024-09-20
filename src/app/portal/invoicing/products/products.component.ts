import { Component } from '@angular/core';
import { ProductsService } from './products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected productsItems: any[] = [];
  protected productsColumns: any[] = [];

  constructor(
    private productsService: ProductsService
  ){
    this.productsColumns = productsService.getProductsColumns();
    this.productsItems = productsService.getProductsItems();
  }

  protected getSeverity(status: string): any {
    switch (status) {
        case 'Branco':
          return 'success';
        case 'Tinto':
          return 'warning';
        case 'Rosé':
          return 'danger';
        case 'Espumante':
          return 'secondary';
        case 'Seco':
          return 'contrast';
        default:
            return 'undefined';
    }
  }
}
