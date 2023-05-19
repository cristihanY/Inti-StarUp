import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';

import { TokenService } from '../../../core/services/token.service'; 


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  

  profile:User| null=null;

  total$: Observable<number>;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    );
  }

  ngOnInit() {
    const token = this.tokenService.getToken();
    //console.log("Enviamos desde header1");
    if(token!=null){
      //console.log("Enviamos desde header2");
      this.getProfile();
    }
    
  }


  getProfile(){
    const token = this.tokenService.getToken();
    this.authService.profile(token)
    .subscribe(user=>{
      //console.log(user);
      this.profile=user;
    });
  }

  terminarSeseion(){
    localStorage.removeItem('token');
    location.reload();
    


  }

}
