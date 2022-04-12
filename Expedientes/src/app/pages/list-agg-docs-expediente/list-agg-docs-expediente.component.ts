import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';

@Component({
  selector: 'app-list-agg-docs-expediente',
  templateUrl: './list-agg-docs-expediente.component.html',
  styleUrls: ['./list-agg-docs-expediente.component.scss']
})
export class ListAggDocsExpedienteComponent implements OnInit {
  ListaNombres:any = [];
  inputNombre:string="";
  inputAP:string="";
  inputAM:string="";

//, private datosInicialesExpedientes:DatosInicialesExpedientesService
  constructor(public router:Router, private datosInicialesExpedientes:DatosInicialesExpedientesService) { }

  ngOnInit(): void {
    this.listarDatos();
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

  listarDatos(){
    if(this.inputNombre == "" && this.inputAP == "" && this.inputAM  == ""){
      
      this.datosInicialesExpedientes.getListaDeNombresEmpleados().subscribe(
        res=>{
          this.ListaNombres=<any>res;
          console.log(res);
          
        },
        err=> console.log(err)
        
      );

    }else{
      //nombre
      if(this.inputNombre != "" && this.inputAP == "" && this.inputAM  == ""){
        this.ListaNombres = [];

      }else{
        //nombre y apellido paterno
        if(this.inputNombre != "" && this.inputAP != "" && this.inputAM  == ""){

        }else{
          //nombre completo
          if(this.inputNombre != "" && this.inputAP != "" && this.inputAM  != ""){

          }
        }
      }

    }
    
  }

  

}
