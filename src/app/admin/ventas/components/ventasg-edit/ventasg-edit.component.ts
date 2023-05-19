import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CompraService } from './../../../../core/services/compra.service';
import {Product} from '../../../../core/models/product.model'
import { CategoriesService } from 'src/app/core/services/categories.service';
import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { Category } from 'src/app/core/models/category.model';
import {Venta} from '../../../../core/models/venta.model';
import {UserService } from 'src/app/core/services/user.service';
import { User } from '../../../../core/models/user.model';
import {ItemVenta} from '../../../../core/models/itemVenta.model';
import {ItemVentaPedido} from '../../../../core/models/itemVentaPedido';


@Component({
  selector: 'app-ventasg-edit',
  templateUrl: './ventasg-edit.component.html',
  styleUrls: ['./ventasg-edit.component.scss']
})
export class VentasgEditComponent implements OnInit {


  form: FormGroup;
  id: number;
  imagenlink: string;
  categories: Category[]=[];
  profile:User| null=null;
  
  purchases: Venta;
  prodBuscado: Product[]=[];

  purchase1: any[];
  itemVenta: ItemVentaPedido[]=[];

  preciototal=0;

  displayedColumns: string[] = ['name', 'image', 'quantity','price', 'actions'];

  constructor(

    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private compraService: CompraService,
    private userService : UserService , 
  ) { 
    this.buildForm()
  }

  ngOnInit(){
    this.obtenerTodosProduct();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      //console.log(this.id);
      //console.log("llegamos archivos")
      this.compraService.getCompraId(this.id)
        .subscribe(venta=>{
          this.purchases=venta;
          //console.log(venta);
          this.form.patchValue(venta);
          this.getProfiles();
        });
    });
  }



  private buildForm() {
    this.form = this.formBuilder.group({

      comment: ['', [Validators.required]],
    });
  }


  getProfiles(){
    //console.log(this.purchases.clienteId);
    //console.log("ejemlos")
    const id=this.purchases.clienteId;
    this.userService.getClientById(id)
      .subscribe(newProfiles=>{
       this.profile=newProfiles;
      // console.log(this.profile);
       this. obtenerVentaPedido();
      })
 }

 

 obtenerVentaPedido(){
   const originalPedido=this.purchases;
 /*
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
   this.purchase1=newPedido;*/

   console.log(this.purchase1);
   this.generarItems(originalPedido.items);
 }

 generarTotalPrice(){
  
   let arrayItems=this.purchases.items;
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
  console.log(newItemsPedido);
  this.preciototal=this.generarTotalPrice();
  this.itemVenta=newItemsPedido;
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

  obtenerNombreCliente(id: string){
   return this.profile.name;

  }

  obtenerCatidadProductos(array:ItemVenta[]){

   return array.length;

  }
 
   obtenerTodosProduct(){
     this.productsService.getAllProducts()
     .subscribe(products=>{
       this.prodBuscado=products;

     })
   }
 



}
