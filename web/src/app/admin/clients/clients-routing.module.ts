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
  path: 'view/:id',
  component: ViewComponent
}, {
  path: 'create',
  component: FormComponent
}, {
  path: 'edit/:id',
  component: FormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
