import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from './../models/product.model';
import { ProductCarrito } from './../models/carrito.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private productCarrito: ProductCarrito[]=[];
  private cart = new BehaviorSubject<Product[]>([]);
  private cartProducto= new BehaviorSubject<ProductCarrito []>([]);
  


  cartProducto$= this.cartProducto.asObservable();

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.addCarrito(product);
    this.cart.next(this.products);
  }

  addCarrito(product: Product){

    const originaProd= this.products;

    const newArray= originaProd.map(productc=>{
      return{
        productId: productc.productId,
        name: productc.name,
        price: productc.price,
        productImg: productc.productImg,
        stock: productc.stock,
        quantity: 1,
      }
    })

    this.productCarrito=newArray;

    this.cartProducto.next(this.productCarrito);
    //console.log("llegando al carrito");
    //console.log(this.productCarrito);

       
  }

  deleteCarrito(id: number){
    let indexProduct= this.products.findIndex(x=> x.productId===id);
    this.products.splice(indexProduct,1);
    this.cart.next(this.products);

    let indexProductcarrito= this.productCarrito.findIndex(x=> x.productId===id);
    this.productCarrito.splice(indexProductcarrito,1);
    this.cartProducto.next(this.productCarrito);
  }

  calcularSubtotal(){
    let totalcosto= this.productCarrito.reduce((acc,producto)=> acc+ (producto.quantity*producto.price),0);
    return totalcosto;
    console.log("tienes que pagar");
    console.log(totalcosto);
  }


incrementoCantidad(id: number){
  const arraycambiar=this.productCarrito;
  let indexprod= this.productCarrito.findIndex(x=> x.productId===id);

  this.productCarrito[indexprod].quantity+=1;
  this.cartProducto.next(this.productCarrito);
}

decrementoCntidad(id: number){
  let indexprod= this.productCarrito.findIndex(x=> x.productId===id);
  let cantidadproduct=this.productCarrito[indexprod].quantity;
  const minimo= 1;
  if(minimo!== cantidadproduct){
    const arraycambiar=this.productCarrito;
    this.productCarrito[indexprod].quantity-=1;
    this.cartProducto.next(this.productCarrito);
  }

}


}
