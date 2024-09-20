import { Component } from '@angular/core';
import { SalesRequestsService } from './sales-requests.service';

@Component({
  selector: 'app-sales-requests',
  templateUrl: './sales-requests.component.html',
  styleUrl: './sales-requests.component.css'
})
export class SalesRequestsComponent {
  protected salesRequestsColumns: any[] = [];
  protected salesRequestsItems: any[] = [];

  constructor(
    private salesRequestsService: SalesRequestsService
  ){
    this.salesRequestsColumns = salesRequestsService.getSalesRequestsColumns();
    this.salesRequestsItems = salesRequestsService.getSalesRequestsItems();
  }
}
