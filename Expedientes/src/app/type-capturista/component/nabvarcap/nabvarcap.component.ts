import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nabvarcap',
  templateUrl: './nabvarcap.component.html',
  styleUrls: ['./nabvarcap.component.scss']
})
export class NabvarcapComponent implements OnInit {
 /* menuItems=[
    {linkId:1, linkName: 'Registrar', linkUrl:'registrar-persona'},
    {linkId:2, linkName: 'Ver listado', linkUrl:'list-agg-docs-expediente'},
    {linkId:2, linkName: 'Cerrar Sesión',  click:'cerrarSesion()'},
    {linkId:3, linkName:'Idiomas', linkUrl:'registrar-idiomas'},
    {linkId:4, linkName:'RegisNew', linkUrl:'registro-new-data'},
    {linkId:5, linkName:'EditNew', linkUrl:'edit-new-data'},
    {linkId:6, linkName:'ConsulNew', linkUrl:'consulto-data'},
    {linkId:7, linkName: 'Personas Exis', linkUrl:'registro-info-personal-existente'},
    
  ]*/

  constructor(
    private cookieService:CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async registroNuevos(){
    this.router.navigateByUrl('registro/personal-tramite');

  }

  async editar(){
    this.router.navigateByUrl('registro/editar-personal');

  }

  async consultas(){
    this.router.navigateByUrl('registro/consultas');

  }

  async registroExistentes(){
    this.router.navigateByUrl('registro/personal-existente');

  }

  async consultaFechaPrimerPago(){
    this.router.navigateByUrl('registro/consulta-fecha-pago');

  }
  

  async cerrarSesion(){
    await  this.cookieService.delete('token_access','/');
    await this.cookieService.delete('rol_user','/');
    await this.cookieService.delete('user','/');
    this.router.navigateByUrl('login');
  }

}
