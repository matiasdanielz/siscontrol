import { Injectable } from '@angular/core';

interface column{
  property: string,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() { }

  public getCustomersColumns(): column[]{
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
      }
    ];
  }

  public getCustomersItems(): any[]{
    return [
      {
        "id": "0001",
        "name": "Lojas Americanas",
        "type": "Fisica"
      },
      {
        "id": "0002",
        "name": "Magazine Luiza",
        "type": "Juridica"
      },
      {
        "id": "0003",
        "name": "Eletrobras",
        "type": "Juridica"
      },
      {
        "id": "0004",
        "name": "Petrobras",
        "type": "Fisica"
      },
      {
        "id": "0005",
        "name": "Havan",
        "type": "Juridica"
      },
      {
        "id": "0006",
        "name": "Banco do Brasil",
        "type": "Fisica"
      },
      {
        "id": "0007",
        "name": "Caixa Econômica Federal",
        "type": "Juridica"
      },
      {
        "id": "0008",
        "name": "Natura Cosméticos",
        "type": "Fisica"
      },
      {
        "id": "0009",
        "name": "BRF S.A.",
        "type": "Fisica"
      },
      {
        "id": "0010",
        "name": "Ambev",
        "type": "Juridica"
      },
      {
        "id": "0011",
        "name": "Votorantim",
        "type": "Fisica"
      },
      {
        "id": "0012",
        "name": "JBS S.A.",
        "type": "Fisica"
      },
      {
        "id": "0013",
        "name": "Embraer",
        "type": "Juridica"
      },
      {
        "id": "0014",
        "name": "Vale S.A.",
        "type": "Fisica"
      },
      {
        "id": "0015",
        "name": "Gerdau",
        "type": "Juridica"
      },
      {
        "id": "0016",
        "name": "Grupo Pão de Açúcar",
        "type": "Fisica"
      },
      {
        "id": "0017",
        "name": "Cosan",
        "type": "Fisica"
      },
      {
        "id": "0018",
        "name": "Ultrapar",
        "type": "Juridica"
      },
      {
        "id": "0019",
        "name": "Raízen",
        "type": "Juridica"
      },
      {
        "id": "0020",
        "name": "Energisa",
        "type": "Fisica"
      },
      {
        "id": "0021",
        "name": "TIM Brasil",
        "type": "Fisica"
      },
      {
        "id": "0022",
        "name": "Oi",
        "type": "Juridica"
      },
      {
        "id": "0023",
        "name": "Vivo",
        "type": "Fisica"
      },
      {
        "id": "0024",
        "name": "Claro",
        "type": "Juridica"
      },
      {
        "id": "0025",
        "name": "Santander Brasil",
        "type": "Fisica"
      },
      {
        "id": "0026",
        "name": "Itau Unibanco",
        "type": "Juridica"
      },
      {
        "id": "0027",
        "name": "Bradesco",
        "type": "Juridica"
      },
      {
        "id": "0028",
        "name": "XP Inc.",
        "type": "Fisica"
      },
      {
        "id": "0029",
        "name": "BTG Pactual",
        "type": "Fisica"
      },
      {
        "id": "0030",
        "name": "Banco Safra",
        "type": "Juridica"
      }
    ]    
  }
}
