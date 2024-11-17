import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { RegionsComponent } from './regions/regions.component';
import { CondominiumsComponent } from './condominiums/condominiums.component';
import { CondominiumComponent } from './condominium/condominium.component';
import { FaqComponent } from './faq/faq.component';
import { SyncComponent } from './sync/sync.component';

const routes: Routes = [

  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'Regions',
        component: RegionsComponent
      },
      {
        path: 'Condominiums',
        component: CondominiumsComponent
      },
      {
        path: 'Condominium',
        component: CondominiumComponent
      },
      {
        path: 'Faq',
        component: FaqComponent
      },
      {
        path: 'Sync',
        component: SyncComponent
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
