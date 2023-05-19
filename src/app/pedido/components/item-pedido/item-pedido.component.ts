import { Component, Input, OnInit } from '@angular/core';
import {Venta} from '../../../core/models/venta.model'

@Component({
  selector: 'app-item-pedido',
  templateUrl: './item-pedido.component.html',
  styleUrls: ['./item-pedido.component.scss']
})
export class ItemPedidoComponent implements OnInit {

  @Input() purchs: Venta;

  constructor() { }

  ngOnInit(): void {
  }

}
