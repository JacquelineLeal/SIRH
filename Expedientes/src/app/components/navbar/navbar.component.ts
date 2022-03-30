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
  ]
  
  constructor() {
    
   }

  ngOnInit(): void {
 
   
  }

}
