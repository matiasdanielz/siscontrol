import { Injectable } from '@angular/core';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  public getProductsColumns(): column[]{
    return [
      {
        property: 'id',
        label: 'Id'
      },
      {
        property: 'name',
        label: 'Nome'
      },
      {
        property: 'type',
        label: 'Tipo',
      },
      {
        property: 'value',
        label: 'Valor',
      },
      {
        property: 'stock',
        label: 'Estoque',
      },
      {
        property: '',
        label: ''
      }
    ];
  }

  public getProductsItems(): any[]{
    return [
      {
        id: "00001",
        name: 'Vinho Branco',
        type: 'Branco',
        value: 'R$32,12',
        stock: 2
      },
      {
        id: "00002",
        name: 'Vinho Tinto',
        type: 'Tinto',
        value: 'R$45,00',
        stock: 53
      },
      {
        id: "00003",
        name: 'Vinho Rosé',
        type: 'Rosé',
        value: 'R$38,50',
        stock: 0
      },
      {
        id: "00004",
        name: 'Vinho Espumante',
        type: 'Espumante',
        value: 'R$55,90',
        stock: 12
      },
      {
        id: "00005",
        name: 'Vinho Suave',
        type: 'Suave',
        value: 'R$28,30',
        stock: 10
      },
      {
        id: "00006",
        name: 'Vinho Doce',
        type: 'Doce',
        value: 'R$33,15',
        stock: 30
      },
      {
        id: "00007",
        name: 'Vinho Seco',
        type: 'Seco',
        value: 'R$41,20',
        stock: 10
      },
      {
        id: "00008",
        name: 'Vinho Verde',
        type: 'Verde',
        value: 'R$36,00',
        stock: 18
      },
      {
        id: "00009",
        name: 'Vinho Amarelo',
        type: 'Amarelo',
        value: 'R$39,50',
        stock: 19
      },
      {
        id: "00010",
        name: 'Vinho Espumante Brut',
        type: 'Espumante',
        value: 'R$60,00',
      },
      {
        id: "00011",
        name: 'Vinho Branco Seco',
        type: 'Branco',
        value: 'R$34,90',
      },
      {
        id: "00012",
        name: 'Vinho Rosé Suave',
        type: 'Rosé',
        value: 'R$43,80',
      },
      {
        id: "00013",
        name: 'Vinho Tinto Reserva',
        type: 'Tinto',
        value: 'R$75,50',
      },
      {
        id: "00014",
        name: 'Vinho Espumante Rosé',
        type: 'Espumante',
        value: 'R$65,00',
      },
      {
        id: "00015",
        name: 'Vinho Branco Doce',
        type: 'Branco',
        value: 'R$29,90',
      },
      {
        id: "00016",
        name: 'Vinho Tinto Seco',
        type: 'Tinto',
        value: 'R$49,99',
      },
      {
        id: "00017",
        name: 'Vinho Verde Seco',
        type: 'Verde',
        value: 'R$37,50',
      },
      {
        id: "00018",
        name: 'Vinho Branco Suave',
        type: 'Branco',
        value: 'R$30,60',
      },
      {
        id: "00019",
        name: 'Vinho Rosé Doce',
        type: 'Rosé',
        value: 'R$42,00',
      },
      {
        id: "00020",
        name: 'Vinho Tinto Amadeirado',
        type: 'Tinto',
        value: 'R$80,00',
      },
      {
        id: "00021",
        name: 'Vinho Espumante Seco',
        type: 'Espumante',
        value: 'R$58,70',
      },
      {
        id: "00022",
        name: 'Vinho Branco Verde',
        type: 'Branco',
        value: 'R$34,50',
      },
      {
        id: "00023",
        name: 'Vinho Rosé Seco',
        type: 'Rosé',
        value: 'R$47,20',
      },
      {
        id: "00024",
        name: 'Vinho Tinto Suave',
        type: 'Tinto',
        value: 'R$35,90',
      },
      {
        id: "00025",
        name: 'Vinho Branco Reserva',
        type: 'Branco',
        value: 'R$70,00',
      },
      {
        id: "00026",
        name: 'Vinho Espumante Doce',
        type: 'Espumante',
        value: 'R$61,00',
      },
      {
        id: "00027",
        name: 'Vinho Tinto Barricado',
        type: 'Tinto',
        value: 'R$89,00',
      },
      {
        id: "00028",
        name: 'Vinho Rosé Reserva',
        type: 'Rosé',
        value: 'R$55,50',
      },
      {
        id: "00029",
        name: 'Vinho Branco Amadeirado',
        type: 'Branco',
        value: 'R$64,30',
      },
      {
        id: "00030",
        name: 'Vinho Tinto Frutado',
        type: 'Tinto',
        value: 'R$50,20',
      }
    ];
    
  }
}
