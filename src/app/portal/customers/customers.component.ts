import { Component } from '@angular/core';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  protected customersItems: any[] = [];
  protected customersColumns: any[] = [];

  constructor(
    private customersService: CustomersService
  ){
    this.customersColumns = customersService.getCustomersColumns();
    this.customersItems = customersService.getCustomersItems();
  }

  protected getSeverity(status: string): any {
    switch (status) {
        case 'Fisica':
            return 'success';
        case 'Juridica':
            return 'warning';
        default:
            return 'undefined';
    }
  }
}
