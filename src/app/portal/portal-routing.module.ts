import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { RegionsComponent } from './regions/regions.component';
import { CondominiumsComponent } from './condominiums/condominiums.component';
import { FaqComponent } from './faq/faq.component';
import { SyncComponent } from './sync/sync.component';
import { SavingsComponent } from './savings/savings/savings.component';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

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
        path: 'Savings',
        component: SavingsComponent,
        canDeactivate: [CanDeactivateGuard]
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
