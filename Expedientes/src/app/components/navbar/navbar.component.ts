import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems=[
    {linkId:1, linkName: 'Registrar', linkUrl:'registrar-persona'},
    {linkId:2, linkName: 'Ver listado', linkUrl:'list-agg-docs-expediente'},
    {linkId:2, linkName: 'Cerrar Sesión',  click:'cerrarSesion()'},
    {linkId:3, linkName:'Idiomas', linkUrl:'registrar-idiomas'},
    {linkId:4, linkName:'RegisNew', linkUrl:'registro-new-data'},
    {linkId:5, linkName:'EditNew', linkUrl:'edit-new-data'},
    {linkId:6, linkName:'ConsulNew', linkUrl:'consulto-data'},
    {linkId:7, linkName: 'Personas Exis', linkUrl:'registro-info-personal-existente'},
    
  ]
  
  constructor(
    private cookieService:CookieService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
 
   
  }

  

  async registroNuevos(){
    this.router.navigateByUrl('registro-new-data');

  }

  async editar(){
    this.router.navigateByUrl('edit-new-data');

  }

  async consultas(){
    this.router.navigateByUrl('consulto-data');

  }

  async registroExistentes(){
    this.router.navigateByUrl('registro-info-personal-existente');

  }

  async cerrarSesion(){
    await  this.cookieService.delete('token_access','/');
     this.router.navigateByUrl('login');
 
   }




}
