import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [{
  path: '',
  component: ListComponent,
  pathMatch: 'full'
}, {
  path: 'view/:clientId',
  component: ViewComponent
}, {
  path: 'view/:clientId/sockets',
  loadChildren: () => import('./sockets/sockets.module').then(m => m.SocketsModule)
}, {
  path: 'create',
  component: FormComponent
}, {
  path: 'edit/:clientId',
  component: FormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
