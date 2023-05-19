import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

import { CartService } from './../../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  products$: Observable<Product[]>;
  product: Product;
  copia: Product[]=[];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) { 
    this.products$ = this.cartService.cart$;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });

    this.products$.subscribe(pro=>{
      this.copia=pro;
    })
  }

  fetchProduct(id: number) {
    this.productsService.getProduct(id)
    .subscribe(product => {
     // console.log(product);
      this.product = product;
    });
  }


  addCart() {
    //console.log('añadir al carrito');
    if(this.verificarproducto(this.product.productId)==null){
      //console.log("El producto aun no exite")
      this.products$.subscribe(pro=>{
        this.copia=pro;
      });
      //console.log('añadir al carrito2');
      this.cartService.addCart(this.product);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha añadido un nuevo artículo a tu Cesta.',
        showConfirmButton: false,
        timer: 2000
      })
      // this.productClicked.emit(this.product.id);
    }else{
      alert("ya esta agregado al carrito este producto");
  
    }

  }


  verificarproducto(id: number){
    if(this.copia.length!=0){
      
      if(this.copia.find(element=> element.productId==id)){
        const idExist= this.copia.find(element=> element.productId==id);
        return idExist.productId;
      }
     
      
    }else{
      //console.log("Aun no hay objetos");
    }
  }


 /*
  createProduct() {
    const newProduct: Product = {
      _id: '222',
      name: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo producto'
    };
    this.productsService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: 'edicion titulo'
    };
    this.productsService.updateProduct('2', updateProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct('222')
    .subscribe(rta => {
      console.log(rta);
    });
  }*/

}
