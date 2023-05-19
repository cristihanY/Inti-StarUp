import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {Venta} from '../models/venta.model'

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient
  ) { 
    
  }
  
  getAllCompras(){
      return this.http.get<Venta[]>(`${environment.url_api}purchase/all`);

  }

  getCompraId(id: number){
    return this.http.get<Venta>(`${environment.url_api}purchase/${id}`);
  }
  createVenta(venta: Venta){
    console.log(typeof(venta));
    return this.http.post<Venta>(`${environment.url_api}purchase/save`,JSON.stringify(venta), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  obtenerProductoByidCliente(id: String){

     return this.http.get<Venta[]>(`${environment.url_api}purchase/client/${id}`)
  }

}
