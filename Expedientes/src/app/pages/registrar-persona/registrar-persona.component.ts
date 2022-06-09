import { Component, OnInit } from '@angular/core';
import {DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {
 
  date: Date = new Date();

 /* newRegistrarDatos: Datos = {

    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    ESTATUS : 'P',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
        
    SEXO:'',
    FECHA_NAC: this.date,
    EST_CIVIL:'',
    CVE_RFC:'',
    CURP:'',
    CVE_ELECTOR:'',
    LICENCIA:'',
        
    PASAPORTE:'',
    CARTILLA:'',

    PAIS_NAC:0,
    EDO_NAC:0,
    MUN_NAC:0,
    NACIONALIDAD:0,

    CVE_EMPLEADO:'00000',
    TABLAS:'',
    FCH_UAC: this.date,


    OBSERVACIONES:'',

    EMAIL:'',
    TELEFONO:'',
    CELULAR:'',

    CALLE:'',
    ENTRE_CALLE:'',
    Y_CALLE:'',

    NO_EXTERIOR:'', 
    NO_INTERIOR:'',
    COLONIA:'',
    CODIGO_POSTAL:'',
    ENTIDAD :'',
    MUNICIPIO:'',
    CIUDAD:''

     
  }*/
  constructor(public router:Router, private datosInicialesService: DatosInicialesExpedientesService) { }

  ngOnInit(): void { 
    //console.log(this.newRegistrarDatos);
    
    
    
  }

 /* registrarDatosPDE(){ 

    this.datosInicialesService.addDatosPDE(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{

        console.log(res);
        //AQUI GUARDAR LAS VARIABLES PARA ENVIAR A REGISTRAR INFO ESCOLAR
        alert("Datos registrados exitosamente");
        console.log(this.datosInicialesService.ValoresInputsRegistroDataPD);
        this.router.navigateByUrl('registrar-info-escolar');
        //this.router.navigateByUrl('list-agg-docs-expediente')
      }, 
      
      err=>{

        alert("Ha ocurrido un error de conexión, favor de intentarlo nuevamente");
        console.log(err)
      }
      
    );

  }*/

}
