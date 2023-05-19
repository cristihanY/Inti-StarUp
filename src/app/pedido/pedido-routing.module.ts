import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MypedidoComponent} from './components/mypedido/mypedido.component'

const routes: Routes = [
  {
    path: '',
    component:MypedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
