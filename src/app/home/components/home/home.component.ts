import { Component, OnInit, AfterViewInit } from '@angular/core';


import Swiper from 'swiper';

import { Product } from './../../../core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})





export class HomeComponent implements OnInit, AfterViewInit {

  products: Product[] = [
  ];
  mySwiper: Swiper;


  constructor(
    private productsService: ProductsService
  ) { }



  ngOnInit() {
    this.fetchProducts();
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container');
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    //console.log('product');
    this.productsService.getAllProducts()
    .subscribe(products => {

      this.products = products;
    });
  }


}
