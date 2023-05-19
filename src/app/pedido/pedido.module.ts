import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { MypedidoComponent } from './components/mypedido/mypedido.component';
import { ItemPedidoComponent } from './components/item-pedido/item-pedido.component';
import { PedidounitarioComponent } from './components/pedidounitario/pedidounitario.component';


@NgModule({
  declarations: [MypedidoComponent, ItemPedidoComponent, PedidounitarioComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule
  ]
})
export class PedidoModule { }
