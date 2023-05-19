import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from './../../../core/models/product.model';
import { Venta } from './../../../core/models/venta.model';
import { ItemVenta} from './../../../core/models/itemVenta.model';
import { User} from './../../../core/models/user.model';
import { CartService } from './../../../core/services/cart.service';
import { UserService } from './../../../core/services/user.service';
import {ProductCarrito } from './../../../core/models/carrito.model';
import { AuthService } from 'src/app/core/services/auth.service';
import {CompraService} from '../../../core/services/compra.service';
import { TokenService } from '../../../core/services/token.service'; 


import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  cantidad: number=1;
  precioUproducto: number=0;
  subtotal: number=0;
  gastosEnvio: number=10;
  total:number=0;

  compraProducto: Venta;
 
  products$: Observable<Product[]>;
  productCarito$: Observable<ProductCarrito[]>;
  carrito: ProductCarrito[]=  [];
  displayedColumns: string[] = [ 'name','image', 'price','cantidad','stock', 'actions'];


  profile:User| null=null;
  
   token = this.tokenService.getToken();


  itemVenta: ItemVenta[]=[];

  

  form: FormGroup;
  formProduct: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private compraService: CompraService,
    private router: Router,
  ) {
    this.productCarito$=this.cartService.cartProducto$;
    this.products$ = this.cartService.cart$;
    this.buildForm();
    this.build1Form();
  }

  ngOnInit() {
    const token = this.tokenService.getToken();
    this.cartService.calcularSubtotal();
    this.obtenerSubtotal();
    this.totalPagar();
    if(token!=null){
      this.getProfile();
    }
    this.build1Form();
    
  }

  user: any=[];

  deleteProduct(id: number) {
    this.cartService.deleteCarrito(id);
    //console.log("imprimimos el id")
    //console.log(id);
    this.obtenerSubtotal();
    this.totalPagar()
    
 
  }

  getProfile(){
    const token = this.tokenService.getToken();
    this.authService.profile(token)
    .subscribe(user=>{
      this.profile=user;
      this.form.patchValue(user);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id:[],
      name: ['', Validators.required],
      lastName:['', Validators.required],
      numberPhone:['', Validators.required],
      address:['', Validators.required],
      email:['', Validators.required],
      city:['', Validators.required],
      district:['', Validators.required],
      password:['', Validators.required],
      rolClient:['', Validators.required],
      conditionCliente:['', Validators.required],
      postalCod:['',Validators.required],
    });
  }

aupdateDattos(){

  if(this.form.valid){
    const value=this.form.value;
    this.userService.create(value)
      .subscribe(updateclient=>{
        console.log(updateclient);
        this.router.navigate(['/order']);
      })
  }

}

redireccionar(){
  this.router.navigate(['/products'])
}


envioCarrito(){
  this.compraProducto={
    clienteId: this.profile.id,
    paymentMethod: 'Yape',
    comment: 'Solicitado',
    state: 't',
    items:  this.itemVenta
  }
  
}

enviarft(){
  
  this.obtenerProductos();
  this.envioCarrito();
 //console.log("enviando");
  this.compraService.createVenta(this.compraProducto)
  .subscribe(venta=>{
    console.log(venta);
  })
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'La compra se ha realizado correctamente.',
    showConfirmButton: false,
    timer: 1500
  })
  //console.log("salimos")
  //console.log(this.compraProducto);

  
}

obtenerProductos(){

 this.productCarito$.subscribe(product=>{
    this.carrito=product;
  });

  const originalCarrito= this.carrito;
  const newCarritoArray= originalCarrito.map(items=>{
    return{
      productId: items.productId,
      quantity: items.quantity,
      total: items.price*items.quantity,
      active: true,
    }
  })
  this.itemVenta=newCarritoArray;
}



  
  private build1Form(){
    this.formProduct= this.formBuilder.group({
      clientId: [''],
      paymentMethod:[''],
      comment:[''],
      state:['true'],
      items:this.formBuilder.array([])

    });
  }


  

  addItemsField(){
    this.itemsField.push(this.createItemsField());
  }

  private createItemsField(){
    return this.formBuilder.group({
      productId:['12'],
      quantity: ['12'],
      total: ['12'],
      active: ['true']
    });
  }

  get itemsField(){
    return this.formProduct.get('items') as FormArray;
  }
 


  addAddressField() {
    this.addressField.push(this.createAddressField());
  }

  private createAddressField() {
    return this.formBuilder.group({
      zip: ['', Validators.required],
      text: ['1', Validators.required]
    });
  }

  get addressField() {
    return this.form.get('address') as FormArray;
  }

  save() {
    console.log(this.form.value);
  }

  obtenerSubtotal(){
    this.subtotal=this.cartService.calcularSubtotal();
  }

  totalPagar(){
    this.total=this.subtotal+this.gastosEnvio;
  }

  obtenercatidad(value: number){
      this.cantidad=value;
  }

  obtenerPrecioproducto(price: number){
      this.precioUproducto=price;
  }

  get numberField(){
    
    return this.form.get('number');

  }




  incrementoCantidad(id: number){
      this.cartService.incrementoCantidad(id);
      this.obtenerSubtotal();
      this.totalPagar();
  }

  decrementoCntidad(id: number){
    this.cartService.decrementoCntidad(id);
    this.obtenerSubtotal();
    this.totalPagar();
  }

  //agregado al usuario


  saves(){
    
     console.log(this.formProduct.value);
  }
 

  sendData(){

  }

  digirAlogin(){
    alert("Inicie sesion o registrese entes de continuar");
    this.router.navigate(['/auth/login'])
  }

  mensajeSug(){
    alert("Agregre al menos un producto");
    this.router.navigate(['/products'])
  }
}
