import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-default',
  templateUrl: './page-default.component.html',
  styleUrl: './page-default.component.css'
})
export class PageDefaultComponent {
  //Cabeçalho
  @Input() pageTitle!: string;
  @Input() pageSubtitle!: string;
  @Input() pageObservation!: string;

  //Breadcrumb
  @Input() breadcrumbItems: MenuItem[] = [];
}
