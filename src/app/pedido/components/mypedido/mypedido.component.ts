import { Component, OnInit } from '@angular/core';
import {Venta} from '../../../core/models/venta.model';
import {ItemVenta} from '../../../core/models/itemVenta.model'
import { newArray } from '@angular/compiler/src/util';
import { User } from '../../../core/models/user.model';
import { TokenService } from '../../../core/services/token.service'; 
import { AuthService } from 'src/app/core/services/auth.service';
import {CompraService} from 'src/app/core/services/compra.service';
import {Product} from '../../../core/models/product.model'

import {ProductsService} from'src/app/core/services/products/products.service'
import { ItemPedidoComponent } from '../item-pedido/item-pedido.component';

@Component({
  selector: 'app-mypedido',
  templateUrl: './mypedido.component.html',
  styleUrls: ['./mypedido.component.scss']
})
export class MypedidoComponent implements OnInit {

  profile:User| null=null;
  purchase1: any[];
  
  purchase: Venta[] =[];
  prodBuscado: Product[]=[];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private compraService: CompraService,
    private productsService:ProductsService
  ) { }

  ngOnInit(){
  this.obtenerTodosProduct();
  this.getProfile();    // this.obtenerProductoPedido();
  }

  getProfile(){
    const token = this.tokenService.getToken();
    this.authService.profile(token)
    .subscribe(user=>{
      this.profile=user;
      this.fechProductosPedidos();
    });

  }


  fechProductosPedidos(){
    this.compraService.obtenerProductoByidCliente(this.profile.id)
    .subscribe(pedidos=>{
      this.purchase=pedidos;
      this.obtenerProductoPedido();
    })


  }



  obtenerProductoPedido(){
    const originalPedido=this.purchase;

    const newPedido=originalPedido.map(pedido=>{
      return{
        purchaseId: pedido.purchaseId,
        clienteId: pedido.clienteId,
        date: pedido.date,
        paymentMethod: pedido.paymentMethod,
        comment: pedido.comment,
        state: this.generarTotalPrice(pedido.purchaseId),
        totalPrice: this.generarTotalPrice(pedido.purchaseId),
        items: this.generarItems(pedido.items)
      }
    })
    this.purchase1=newPedido;
  }

  generarTotalPrice(id: number){
    let indexProduct=this.purchase.findIndex(product=>product.purchaseId==id);
    let arrayItems=this.purchase[indexProduct].items;
    return arrayItems.reduce((acc, contenido)=>acc+contenido.total,0);
  }



  generarItems(array:ItemVenta[]){

    const arrayPedido=array;
    const newItemsPedido=arrayPedido.map(item=>{
      return{
        name: this.obtenerNombreProducto(item.productId),
        quantity: item.quantity,
        productImg: this.obtenerImgProduct(item.productId),
        descriptionProduct:this.obtenerDescritionProduct(item.productId),
        price: this.obtenerPriceProduct(item.productId),
        total: item.total,
        active: item.active
      }
    });

    return newItemsPedido;
  }


 obtenerNombreProducto(id: number){
  let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
    return this.prodBuscado[indexProduct].name;
  }

 obtenerImgProduct(id: number){
  let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
  return this.prodBuscado[indexProduct].productImg;
 } 
 obtenerDescritionProduct(id: number){
  let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
  return this.prodBuscado[indexProduct].descriptionProduct;
 } 

 obtenerPriceProduct(id: number){
  let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
  return this.prodBuscado[indexProduct].price;
 } 

  obtenerTodosProduct(){
    this.productsService.getAllProducts()
    .subscribe(products=>{
      this.prodBuscado=products;
    })
  }


}
