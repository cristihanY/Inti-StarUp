import { Component, Input, OnInit } from '@angular/core';
import {ItemVentaPedido} from '../../../core/models/itemVentaPedido'

@Component({
  selector: 'app-pedidounitario',
  templateUrl: './pedidounitario.component.html',
  styleUrls: ['./pedidounitario.component.scss']
})
export class PedidounitarioComponent implements OnInit {

  @Input() item: ItemVentaPedido;

  constructor() { 

  }

  ngOnInit(): void {
  }


  imprimir(){
    console.log(this.item);
  }

}
