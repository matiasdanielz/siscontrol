import { Injectable } from '@angular/core';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class SalesRequestsService {

  constructor() { }

  public getSalesRequestsColumns(): column[]{
    return [
      {
        property: 'orderNumber',
        label: 'Número do Pedido',
      },
      {
        property: 'orderDate',
        label: 'Data do Pedido',
      },
      {
        property: 'customerName',
        label: 'Nome do Cliente',
      },
      {
        property: 'product',
        label: 'Produto',
      },
      {
        property: 'quantity',
        label: 'Quantidade',
      },
      {
        property: 'totalValue',
        label: 'Valor Total',
      }
    ];
  }

  public getSalesRequestsItems(): any[]{
    return [
      {
        orderNumber: '0001',
        orderDate: '01-10-2023',
        customerName: 'João Silva',
        product: 'Vinho Branco',
        quantity: 3,
        totalValue: 'R$96,36',
      },
      {
        orderNumber: '0002',
        orderDate: '01-12-2023',
        customerName: 'Maria Souza',
        product: 'Vinho Tinto',
        quantity: 2,
        totalValue: 'R$90,00',
      },
      {
        orderNumber: '0003',
        orderDate: '01-15-2023',
        customerName: 'Carlos Pereira',
        product: 'Vinho Rosé',
        quantity: 1,
        totalValue: 'R$38,50',
      },
      {
        orderNumber: '0004',
        orderDate: '01-18-2023',
        customerName: 'Ana Lima',
        product: 'Vinho Espumante',
        quantity: 5,
        totalValue: 'R$279,50',
      },
      {
        orderNumber: '0005',
        orderDate: '01-20-2023',
        customerName: 'Pedro Mendes',
        product: 'Vinho Suave',
        quantity: 4,
        totalValue: 'R$113,20',
      },
      {
        orderNumber: '0006',
        orderDate: '01-22-2023',
        customerName: 'Juliana Ribeiro',
        product: 'Vinho Doce',
        quantity: 2,
        totalValue: 'R$66,30',
      },
      {
        orderNumber: '0007',
        orderDate: '01-25-2023',
        customerName: 'Lucas Oliveira',
        product: 'Vinho Seco',
        quantity: 6,
        totalValue: 'R$247,20',
      },
      {
        orderNumber: '0008',
        orderDate: '01-28-2023',
        customerName: 'Fernanda Gomes',
        product: 'Vinho Verde',
        quantity: 3,
        totalValue: 'R$108,00',
      },
      {
        orderNumber: '0009',
        orderDate: '01-30-2023',
        customerName: 'Ricardo Martins',
        product: 'Vinho Amarelo',
        quantity: 2,
        totalValue: 'R$79,00',
      },
      {
        orderNumber: '0010',
        orderDate: '02-02-2023',
        customerName: 'Sofia Nogueira',
        product: 'Vinho Espumante Brut',
        quantity: 1,
        totalValue: 'R$60,00',
      },
      {
        orderNumber: '0011',
        orderDate: '02-05-2023',
        customerName: 'Felipe Azevedo',
        product: 'Vinho Branco Seco',
        quantity: 4,
        totalValue: 'R$139,60',
      },
      {
        orderNumber: '0012',
        orderDate: '02-07-2023',
        customerName: 'Camila Santos',
        product: 'Vinho Rosé Suave',
        quantity: 2,
        totalValue: 'R$87,60',
      },
      {
        orderNumber: '0013',
        orderDate: '02-10-2023',
        customerName: 'Bruno Almeida',
        product: 'Vinho Tinto Reserva',
        quantity: 1,
        totalValue: 'R$75,50',
      },
      {
        orderNumber: '0014',
        orderDate: '02-12-2023',
        customerName: 'Gabriela Costa',
        product: 'Vinho Espumante Rosé',
        quantity: 3,
        totalValue: 'R$195,00',
      },
      {
        orderNumber: '0015',
        orderDate: '02-15-2023',
        customerName: 'Daniel Ferreira',
        product: 'Vinho Branco Doce',
        quantity: 5,
        totalValue: 'R$149,50',
      },
      {
        orderNumber: '0016',
        orderDate: '02-18-2023',
        customerName: 'Eduardo Souza',
        product: 'Vinho Tinto Seco',
        quantity: 3,
        totalValue: 'R$149,97',
      },
      {
        orderNumber: '0017',
        orderDate: '02-20-2023',
        customerName: 'Beatriz Farias',
        product: 'Vinho Verde Seco',
        quantity: 4,
        totalValue: 'R$150,00',
      },
      {
        orderNumber: '0018',
        orderDate: '02-22-2023',
        customerName: 'Rodrigo Barros',
        product: 'Vinho Branco Suave',
        quantity: 2,
        totalValue: 'R$61,20',
      },
      {
        orderNumber: '0019',
        orderDate: '02-25-2023',
        customerName: 'Patrícia Lopes',
        product: 'Vinho Rosé Doce',
        quantity: 6,
        totalValue: 'R$252,00',
      },
      {
        orderNumber: '0020',
        orderDate: '02-28-2023',
        customerName: 'Renato Moraes',
        product: 'Vinho Tinto Amadeirado',
        quantity: 2,
        totalValue: 'R$160,00',
      },
      {
        orderNumber: '0021',
        orderDate: '03-01-2023',
        customerName: 'Lucas Carvalho',
        product: 'Vinho Espumante Seco',
        quantity: 5,
        totalValue: 'R$293,50',
      },
      {
        orderNumber: '0022',
        orderDate: '03-03-2023',
        customerName: 'Vanessa Pires',
        product: 'Vinho Branco Verde',
        quantity: 3,
        totalValue: 'R$103,50',
      },
      {
        orderNumber: '0023',
        orderDate: '03-05-2023',
        customerName: 'Rafael Campos',
        product: 'Vinho Rosé Seco',
        quantity: 4,
        totalValue: 'R$188,80',
      },
      {
        orderNumber: '0024',
        orderDate: '03-08-2023',
        customerName: 'Fernanda Borges',
        product: 'Vinho Tinto Suave',
        quantity: 6,
        totalValue: 'R$215,40',
      },
      {
        orderNumber: '0025',
        orderDate: '03-10-2023',
        customerName: 'Carla Cunha',
        product: 'Vinho Branco Reserva',
        quantity: 2,
        totalValue: 'R$140,00',
      },
      {
        orderNumber: '0026',
        orderDate: '03-12-2023',
        customerName: 'Diego Araújo',
        product: 'Vinho Espumante Doce',
        quantity: 4,
        totalValue: 'R$244,00',
      },
      {
        orderNumber: '0027',
        orderDate: '03-15-2023',
        customerName: 'Tatiane Martins',
        product: 'Vinho Tinto Barricado',
        quantity: 1,
        totalValue: 'R$89,00',
      },
      {
        orderNumber: '0028',
        orderDate: '03-18-2023',
        customerName: 'Paulo Miranda',
        product: 'Vinho Rosé Reserva',
        quantity: 3,
        totalValue: 'R$166,50',
      },
      {
        orderNumber: '0029',
        orderDate: '03-20-2023',
        customerName: 'Flávia Moreira',
        product: 'Vinho Branco Amadeirado',
        quantity: 2,
        totalValue: 'R$128,60',
      },
      {
        orderNumber: '0030',
        orderDate: '03-22-2023',
        customerName: 'Marcos Viana',
        product: 'Vinho Tinto Frutado',
        quantity: 5,
        totalValue: 'R$251,00',
      }
    ];    
  }
}
