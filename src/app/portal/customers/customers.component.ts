import { Component, ViewChild, viewChild } from '@angular/core';
import { CustomersService } from './customers.service';
import { Table } from 'primeng/table';


interface ExportColumn {
  title: string;
  dataKey: string;
}


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  @ViewChild('customersTable', { static: true}) customersTable!: Table;

  //Modal
  protected isNewCustomerModalOpen: boolean = false;
  protected isEditCustomerModalOpen: boolean = false;

  protected personTypes: any[] = [
    { 
      label: 'Fisica', 
      value: 'F' 
    },
    { 
      label: 'Juridica', 
      value: 'J' 
    }
  ];

  protected personTypeValue: string = 'F';

  //Tabela Principal
  protected customersItems: any[] = [];
  protected customersColumns: any[] = [];

  protected customer: any;

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

  protected showNewCustomerModal(){
    this.isNewCustomerModalOpen = true;
  }

  protected showEditCustomerModal(){
    this.isEditCustomerModalOpen = true;
  }

  protected createCustomer(){
    console.log(this.customer);
    this.customersTable.exportCSV();
  }
}
