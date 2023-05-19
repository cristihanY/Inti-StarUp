import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {  Observable } from 'rxjs';
import {  switchMap, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders} from '@angular/common/http';

import {Auth} from '../models/auth.model';
import {User } from '../models/user.model';
import {TokenService} from './token.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private tokenService: TokenService
    
  ) { }

  url: string = "http://localhost:8080/";


  loginm( username: string, password: string){
    
     return this.http.post<Auth>(`${this.url}auth/authenticate`,{username,password})
     .pipe(
      tap(response=> this.tokenService.saveToken(response.access_token))
     );
      
  }



  profile( token: string){
    //const headers= new HttpHeaders().set('Authorization',`Bearer ${token}`)
     
     return this.http.get<User>(`${this.url}auth/profile/${token}`,{});
      
  }





  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    
    return this.http.post(`${this.url}auth/authenticate`,{email,password})
  }

  logout() {
    return this.auth.signOut();
  }

  hasUserd() {
    console.log("holaa aqui solicitando ingresos por un guardian");
    console.log(this.auth.authState);
    this.auth.authState.subscribe(item=>{
      //console.log(item.email);
    })
    return this.auth.authState;
  }

  hasUserNew(){
    const token = this.tokenService.getToken();
    if(token!=null){
      //console.log("hasuser autenticado")
      return this.http.get<User>(`${environment.url_api}auth/authenticate/profile/${token}`,{});
    }

  }

  hasUser(){
   return new Observable(subscriber => {
    console.log("hasuser")
        subscriber.next(false);

    });
  }

}

function isUserConnected(){
  return false;
}

