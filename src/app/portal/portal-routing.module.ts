import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';
import { CondominiumsComponent } from './condominiums/condominiums.component';

const routes: Routes = [

  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'Neighborhoods',
        component: NeighborhoodsComponent
      },
      {
        path: 'Condominiums',
        component: CondominiumsComponent
      },
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
