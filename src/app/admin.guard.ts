import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasUserNew()
    .pipe(
      map(user => user.rolClient === "admin" ? true : false),
      tap(hasUser => {
       
        //console.log(hasUser);
        if (!hasUser) {
          this.router.navigate(['/auth/login']);
          //console.log("camina");
          
          //console.log(hasUser);
        }
        
      }),
    );
  }



}
