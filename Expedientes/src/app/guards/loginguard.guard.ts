import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ){}

 /* redirect(flag: boolean):any{
    if(!flag){
      this.router.navigateByUrl('login');
    }
  }*/
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   // const cookie = this.cookieService.check('token_access');
   // console.log(route.data['role']);
    
    //this.redirect(cookie);

   // return cookie;
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean{
    const cookie_Token = this.cookieService.check('token_access');
    const cookie_rol = this.cookieService.get('rol_user');
    var valorBoolean: boolean;
    console.log('rolcok', cookie_rol);
    if(cookie_Token === true && (cookie_rol === route.data['role'])){
      valorBoolean= true;
      console.log('soy igual');
      

    }else{
      if(cookie_Token === true && (cookie_rol != route.data['role'])){
        valorBoolean= false;
        console.log('no soy igual');
        this.cookieService.delete('token_access','/');
        
;
        alert('no tiene acceso');
        this.router.navigateByUrl('login');

      }
      


    }
    
    return valorBoolean;

    

  }
  
}
 