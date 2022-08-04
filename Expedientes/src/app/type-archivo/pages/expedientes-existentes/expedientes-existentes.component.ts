import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import {Datos,DatosBuscarInputs, DatosInicialesExpedientesService} from '../../../services/datos-iniciales-expedientes.service';

@Component({
  selector: 'app-expedientes-existentes',
  templateUrl: './expedientes-existentes.component.html',
  styleUrls: ['./expedientes-existentes.component.scss']
})
export class ExpedientesExistentesComponent implements OnInit {

  //de la tabla
  listaPersonas: any = [];


  //para cambiar los valores y el color  de la
  //bange que muestra el estado del expediente
  listaEstadoExpediente: any ={
    creado:{
      btn:'badge rounded-pill btn-info',
      texto:'Creado',

    },
    completo:{
        btn:'badge rounded-pill btn-warning',
        texto:'Completo',
    },
    entregadoArchivo:{
      btn:'badge rounded-pill btn-danger',
      texto:'Entregado a archivo',

    },
    archivado:{
      btn:'badge rounded-pill btn-success',
      texto:'Archivado',
    }
    
  };

  //valores para bange que muestra el estado del expediente
  StyleclassBtn: '';
  TextoButton:'';


  //valores inputs de búsqueda
  valoresInputBusqueda: DatosBuscarInputs={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
  }
  constructor(
    private datosInicialesService: DatosInicialesExpedientesService,
  ) { }

  ngOnInit(): void {
    console.log(this.listaEstadoExpediente);
    console.log(this.listaEstadoExpediente.first.btn);
    
    
  }

  buscarData(){ 
    console.log(this.valoresInputBusqueda);

    
    if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == '' ){
      console.log('TODOS VACIOS');
      Swal.fire(
        '',
        'Aún no ha ingresado datos para buscar',
        'info'
      );
      this.listaPersonas = [];
      //alert('No hay datos para buscar');
    }else{
      if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
        console.log('cveEmpleado with valor');
        this.getListaByCve(); 

      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
        console.log('nombre with valor');
        this.getListaByNombre();
      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO == ''){
        console.log('nombre y AP with valor');
        this.getListaByNomAP();
      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO != ''){
        console.log('nombre, AP Y AM  with valor');
        this.getListaByNomCompleto();
      }

      if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && (this.valoresInputBusqueda.NOMBRE != '' || this.valoresInputBusqueda.APE_PATERNO != '' || this.valoresInputBusqueda.APE_MATERNO != '')){
        Swal.fire({
          title:'INFORMACIÓN NO VÁLIDA',
          html:'La consultas que puede realizar son las siguientes:<br><br>'+
                '<ol align="left"><li> Por <b>Número de empleado</b></li>'+
                '<li>Por <b>Nombre</b></li>'+
                '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b> + <b>Apellido Materno</b></li></ol><br>',
                
          icon:'info'
        });
        this.listaPersonas = [];
       // alert('busqueda incorrecta');
      }

      if((this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' ) && (this.valoresInputBusqueda.APE_PATERNO != '' || this.valoresInputBusqueda.APE_MATERNO != '')){
        //alert('2da busqueda incorrecta');
        Swal.fire({
          title:'INFORMACIÓN NO VÁLIDA',
          html:'La consultas que puede realizar son las siguientes:<br>'+
                '<ol align="left"><li> Por <b>número de empleado</b></li>'+
                '<li>Por <b>Nombre</b></li>'+
                '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b> + <b>Apellido Materno</b></li></ol><br>',
                
          icon:'info'
        });
        this.listaPersonas = [];
      }
    }
  }


  async getListaByCve(){
    await this.datosInicialesService.getListaNomSearchByCve(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }

  async getListaByNombre(){
    await this.datosInicialesService.getListaNomSearchByNom(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }


  async getListaByNomAP(){
    await this.datosInicialesService.getListaNomSearchByNomAP(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }

  async getListaByNomCompleto(){
    await this.datosInicialesService.getListaNomSearchByNomComplet(this.valoresInputBusqueda).subscribe(
      res=>{
        this.listaPersonas = res;
        if(Object.keys(this.listaPersonas).length == 0){
          Swal.fire(
            '',
            'No se encontraron coincidencias',
            'info'
          );
          
        }
        console.log(this.listaPersonas);
        
      },
      err=>{
        //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
        console.log(err);
        
      }
    )
  }
}
