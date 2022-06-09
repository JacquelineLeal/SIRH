import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { eventListeners } from '@popperjs/core';
import {IdsParaEditarDataPD, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';

@Component({ 
  selector: 'app-list-agg-docs-expediente',
  templateUrl: './list-agg-docs-expediente.component.html',
  styleUrls: ['./list-agg-docs-expediente.component.scss']
})
export class ListAggDocsExpedienteComponent implements OnInit {
  //InputIdsParaEditarDataPD:any;
  @Input () InputIdParaEditarDataPD: String= ''; 
  @Output() OutputIdParaEditarDataPD = new EventEmitter<String>();

  @Input() InputIdDomiParaEditarDataPD: String = ''; 
  @Output() OutputIdDomiParaEditarDataPD = new EventEmitter<String>();

  //@Input () InputRegistrarDatos: any = {};
  //@Output() OutputRegistroDatos = new EventEmitter();
  
  ListaNombres:any = []; 
  inputNombre:string="";
  inputAP:string="";
  inputAM:string=""; 

  arreglo: any =[];

  capturaIds: IdsParaEditarDataPD={
    Id: '',
    IdDomicilio : '',
    IdEstudios: ''
  }
  
//, private datosInicialesExpedientes:DatosInicialesExpedientesService
  constructor(public router:Router, private datosInicialesExpedientes:DatosInicialesExpedientesService) { }

  ngOnInit(): void {
   // this.listarDatos();
  }

  
 
 /* async btnClickGoToEditarEmpleado(Id: any, IdDomicilio: any, IdEstudios: any){ 
    this.capturaIds.Id = Id;
    this.capturaIds.IdDomicilio = IdDomicilio;
    this.capturaIds.IdEstudios = IdEstudios;
    await this.datosInicialesExpedientes.getDatosEmpleadoById(this.capturaIds).subscribe(
      res =>{
        this.arreglo = res;
        //this.InputRegistrarDatos = res;
        //this.OutputRegistroDatos.emit(this.InputRegistrarDatos);

        this.datosInicialesExpedientes.newRegistrarDatos = this.arreglo[0];
        console.log('list'); 
        console.log(this.datosInicialesExpedientes.newRegistrarDatos);
        this.router.navigateByUrl('edit-info-personal');


      },
      err =>{
        console.log(err);
        
    }
  )*/

   
   
   /* this.InputIdParaEditarDataPD = Id;
    this.InputIdDomiParaEditarDataPD = IdDomicilio;
    console.log(this.InputIdParaEditarDataPD);
    console.log(this.InputIdDomiParaEditarDataPD);

    this.OutputIdParaEditarDataPD.emit(this.InputIdParaEditarDataPD);
    this.OutputIdDomiParaEditarDataPD.emit(this.InputIdDomiParaEditarDataPD);

    this.datosInicialesExpedientes.Id = this.InputIdParaEditarDataPD;
    this.datosInicialesExpedientes.IdDomicilio = this.InputIdDomiParaEditarDataPD;
    this.router.navigateByUrl('edit-info-personal'); */


 /* }
 
  async btnClickGoToSubirDocs(Id: any, IdDomicilio: any, IdEstudios: any){
    this.capturaIds.Id = Id;
    this.capturaIds.IdDomicilio = IdDomicilio;
    this.capturaIds.IdEstudios = IdEstudios;
    

    await this.datosInicialesExpedientes.getDatosEmpleadoById(this.capturaIds).subscribe(
      res =>{
        this.arreglo = res;
        //this.InputRegistrarDatos = res;
        //this.OutputRegistroDatos.emit(this.InputRegistrarDatos);

        this.datosInicialesExpedientes.newRegistrarDatos = this.arreglo[0];
        console.log('list'); 
        console.log(this.datosInicialesExpedientes.newRegistrarDatos);
        this.router.navigateByUrl('subir-docs-expediente');

      },
      err =>{
        console.log(err);
        
      }
    )
    

    
   
  }

  async btnClickGoToVerExpediente(Id: any, IdDomicilio: any, IdEstudios: any){
    this.capturaIds.Id = Id;
    this.capturaIds.IdDomicilio = IdDomicilio;
    this.capturaIds.IdEstudios = IdEstudios;
    await this.datosInicialesExpedientes.getDatosEmpleadoById(this.capturaIds).subscribe(
      res =>{
        this.arreglo = res;
        //this.InputRegistrarDatos = res;
        //this.OutputRegistroDatos.emit(this.InputRegistrarDatos);

        this.datosInicialesExpedientes.updateDatos = this.arreglo[0];
        console.log('list'); 
        console.log(this.datosInicialesExpedientes.updateDatos);
        this.router.navigateByUrl('ver-expediente');


      },
      err =>{
        console.log(err);
        
      }
    )


    
  }

  listarDatos(){
    if(this.inputNombre == "" && this.inputAP == "" && this.inputAM  == ""){
      
      this.datosInicialesExpedientes.getListaDeNombresEmpleados().subscribe(
        res=>{
          this.ListaNombres=<any>res;
          console.log('lista nombres');
          
          console.log(this.ListaNombres);
          
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
    
  }*/

  

}
