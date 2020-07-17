import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClientsComponent } from './clients/clients.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  }, {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
