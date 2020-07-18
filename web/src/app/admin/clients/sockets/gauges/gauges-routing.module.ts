import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [{
  path: '',
  component: ListComponent
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
export class GaugesRoutingModule { }
