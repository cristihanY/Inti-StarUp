import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Product } from '../../../core/models/product.model';

import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  products$: Observable<Product[]>;

  copia: Product[]=[];


  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;
    //console.log('1. constructor');
  }

  ngOnInit() {
    this.products$.subscribe(pro=>{
      this.copia=pro;
    })
    //console.log('3. ngOnInit');
  }

  ngOnDestroy() {
    //console.log('5. ngOnDestroy');
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

}
