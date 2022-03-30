import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-agg-docs-expediente',
  templateUrl: './list-agg-docs-expediente.component.html',
  styleUrls: ['./list-agg-docs-expediente.component.scss']
})
export class ListAggDocsExpedienteComponent implements OnInit {
  

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
 
  btnClickGoToEditarEmpleado(){
    this.router.navigateByUrl('edit-info-personal');
  }

  btnClickGoToSubirDocs(){
    this.router.navigateByUrl('subir-docs-expediente');
  }

  btnClickGoToVerExpediente(){
    this.router.navigateByUrl('ver-expediente');
  }

  

}
