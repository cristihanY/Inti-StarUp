import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../models/product.model';
import { environment } from './../../../environments/environment';
import {TokenService} from './token.service';


@Injectable({
  providedIn: 'root'
})
export class PurschaseService {


  private apurl= 'https://venta-inti.herokuapp.com/inti/api/purchase/';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllPurchase(){
      
  }

  getPurchaseClientId(){

  }

  

}
