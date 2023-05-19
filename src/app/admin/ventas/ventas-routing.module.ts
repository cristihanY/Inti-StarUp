import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VentasgComponent} from './components/ventasg/ventasg.component';
import {VentasgEditComponent} from './components/ventasg-edit/ventasg-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VentasgComponent
  },
  {
    path: 'edit/:id',
    component: VentasgEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
