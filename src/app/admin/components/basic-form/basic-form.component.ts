import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import {Venta} from '../../../core/models/venta.model';
import {ItemVenta} from '../../../core/models/itemVenta.model'
import { newArray } from '@angular/compiler/src/util';
import { User } from '../../../core/models/user.model';
import { TokenService } from '../../../core/services/token.service'; 
import { AuthService } from 'src/app/core/services/auth.service';
import {CompraService} from 'src/app/core/services/compra.service';
import {Product} from '../../../core/models/product.model'

import {ProductsService} from'src/app/core/services/products/products.service'

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  profile:User| null=null;
  purchase1: any[];
  
  purchase: Venta[] =[];
  prodBuscado: Product[]=[];

  constructor(
    private  formBuilder : FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private compraService: CompraService,
    private productsService:ProductsService
  ) {
    this.buildForm();
   }

  form: FormGroup;



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
  
get nameField(){
  //console.log(this.form.get('fullName').get('name').value)
  return this.form.get('fullName.name');
} 

get lastNameField(){
  return this.form.get('fullName.lastName');
} 


  ngOnInit(): void {

  }

  imprimir(){
    console.log(this.nameField.value);
  }

	save(event){
	 
    if(this.form.valid){
      console.log( this.form.value);
    }else{
      this.form.markAllAsTouched();
    }
	}

  private buildForm(){
    this.form= this.formBuilder.group({
      fullName:this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10),Validators.pattern(/^[a-zA-Z]+$/)]],
        lastName: ['', [Validators.required, Validators.minLength(10),Validators.pattern(/^[a-zA-Z]+$/)]]
      }),
      email: ['',[ Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [''],
      number: [''],
      date: [''],
      color: ['#000000'],
   
      category: [''],
      tag: [''],
   
     agree: ['false',[ Validators.requiredTrue]],
     gender:[''],
     zone: ['']
    })
  }

  get isNameFieldValid(){
    return this.nameField.valid && this.nameField.touched;
  }
  
  get isNameFieldInvalid(){
    return this.nameField.invalid && this.nameField.touched;
  }
  get  emailField(){
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }
  get numberField(){
    return this.form.get('number');
  }
  get  passwordField(){
    return this.form.get('password');
  }

}
