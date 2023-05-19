import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../core/services/token.service'; 
import {ItemVenta} from '../../../../core/models/itemVenta.model'

import { ProductsService } from './../../../../core/services/products/products.service';
import { User } from '../../../../core/models/user.model';
import { CompraService } from './../../../../core/services/compra.service';
import {Venta} from '../../../../core/models/venta.model'
import {UserService } from 'src/app/core/services/user.service';
import {Product} from '../../../../core/models/product.model'



@Component({
  selector: 'app-ventasg',
  templateUrl: './ventasg.component.html',
  styleUrls: ['./ventasg.component.scss']
})
export class VentasgComponent implements OnInit {


  products =  [];
  displayedColumns: string[] = ['id',"clienteId", 'name','paymetod','date',"stock", 'price',"description", 'actions'];
  profiles:User[]| null=null;
  purchases: Venta[]=[];



  purchase1: any[];
  
  purchase: Venta[] =[];
  prodBuscado: Product[]=[];


  constructor(
    private productsService: ProductsService,
    private compraService :CompraService,
    private tokenService: TokenService,
    private userService : UserService , 
  ) { }

  ngOnInit() {
    
    this.obtenerTodosProduct();
    this.getProfiles();
    this.fechPurchase();    
  }


  fechPurchase(){
    this.compraService.getAllCompras()
      .subscribe(purchase=>{
        this.purchases=purchase;
        this.obtenerVentaPedido();
      })
  }



  getProfiles(){
     this.userService.getAll()
       .subscribe(newProfiles=>{
        this.profiles=newProfiles;
        //console.log(this.profiles);
       })
  }

  

  obtenerVentaPedido(){
    this.obtenerTodosProduct();
    this.getProfiles();
    if(this.prodBuscado.length===0){
        this.obtenerTodosProduct();
    }

    const originalPedido=this.purchases;

    const newPedido=originalPedido.map(pedido=>{
      return{
        purchaseId: pedido.purchaseId,
        clienteId: pedido.clienteId,
        clientName: this.obtenerNombreCliente(pedido.clienteId),
        date: pedido.date,
        paymentMethod: pedido.paymentMethod,
        comment: pedido.comment,
        state: pedido.state,
        catidadArray:this.obtenerCatidadProductos(pedido.items),
        totalPrice: this.generarTotalPrice(pedido.purchaseId),
        items: this.generarItems(pedido.items)
      }
    });
    this.purchase1=newPedido;

    //console.log(this.purchase1);
  }

  generarTotalPrice(id: number){
    let indexProduct=this.purchases.findIndex(product=>product.purchaseId==id);
    let arrayItems=this.purchases[indexProduct].items;
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
    if(this.prodBuscado.length===0){
      this.obtenerTodosProduct();
  }
    let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
      return this.prodBuscado[indexProduct].name;
    }
  
   obtenerImgProduct(id: number){
    if(this.prodBuscado.length===0){
      this.obtenerTodosProduct();
  }
    let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
    return this.prodBuscado[indexProduct].productImg;
   } 
   obtenerDescritionProduct(id: number){
    if(this.prodBuscado.length===0){
      this.obtenerTodosProduct();
  }
    let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
    return this.prodBuscado[indexProduct].descriptionProduct;
   } 
  
   obtenerPriceProduct(id: number){
    if(this.prodBuscado.length===0){
      this.obtenerTodosProduct();
  }
    let indexProduct=this.prodBuscado.findIndex(prod=>prod.productId===id);   
    return this.prodBuscado[indexProduct].price;
   } 

   obtenerNombreCliente(id: string){
    if(this.prodBuscado.length===0){
      this.obtenerTodosProduct();
  }
  if(this.profiles.length==0){
    this.getProfiles();
}

    let indexClient= this.profiles.findIndex(client=>client.id===id);
    return this.profiles[indexClient].name;

   }

   obtenerCatidadProductos(array:ItemVenta[]){
    if(this.prodBuscado.length===0){
      this.obtenerTodosProduct();
  }

    return array.length;

   }
  
    obtenerTodosProduct(){
      this.productsService.getAllProducts()
      .subscribe(products=>{
        this.prodBuscado=products;

      })
    }
  

  
}
