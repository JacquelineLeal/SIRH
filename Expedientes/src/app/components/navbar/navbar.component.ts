import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems=[
    {linkId:1, linkName: 'Registrar', linkUrl:'registrar-persona'},
    {linkId:2, linkName: 'Ver listado', linkUrl:'list-agg-docs-expediente'},
    {linkId:2, linkName: 'Cerrar Sesión', linkUrl:'login'},
    {linkId:3, linkName:'Idiomas', linkUrl:'registrar-idiomas'},
    {linkId:4, linkName:'RegisNew', linkUrl:'registro-new-data'},
    {linkId:5, linkName:'EditNew', linkUrl:'edit-new-data'},
    {linkId:6, linkName:'ConsulNew', linkUrl:'consulto-data'},
    {linkId:7, linkName: 'Personas Exis', linkUrl:'registro-info-personal-existente'}
  ]
  
  constructor() {
    
   }

  ngOnInit(): void {
 
   
  }

}
