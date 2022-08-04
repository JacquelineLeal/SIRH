import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbararch',
  templateUrl: './navbararch.component.html',
  styleUrls: ['./navbararch.component.scss']
})
export class NavbararchComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  expedientes(){
    this.router.navigateByUrl('archivo/expedientes');


  }

  personalTramite(){
    this.router.navigateByUrl('archivo/list-tramite');

  }

  async cerrarSesion(){
    await  this.cookieService.delete('token_access','/');
    await this.cookieService.delete('rol_user','/');
    await this.cookieService.delete('user','/');
    this.router.navigateByUrl('login');
    
  }

}
