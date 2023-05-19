import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDTO } from '../models/user.model';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl= 'https://venta-inti.herokuapp.com/inti/api/client/'

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO){
      return this.http.post(`${environment.url_api}client/save`, dto);
  }

  getClientById(id: string){
   return this.http.get<User>(`${environment.url_api}client/ClientId/${id}`);
  }

  getAll(){
       return this.http.get<User[]>(`${environment.url_api}client/all`)
  }

  getByName(name: string){
    return this.http.get(`${environment.url_api}client/ClientName/${name}`);
  }

}
