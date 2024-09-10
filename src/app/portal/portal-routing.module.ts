import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent
  },
  {
    path: 'Portal',
    component: PortalComponent
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PortalRoutingModule { }
