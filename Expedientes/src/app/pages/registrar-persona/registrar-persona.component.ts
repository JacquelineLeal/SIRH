import { Component, OnInit } from '@angular/core';
import {Datos, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {

  /*newRegistrarDatos: Datos = {
    ESTATUS : 'P',
    NOMBRE:'',
    APE_PATERNO:'',
    APE_MATERNO:'',
        
    SEXO:'',
    FECHA_NAC:'',
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
    FCH_UAC: '',


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
    CIUDAD:'',


    ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''        

      
  }*/
  constructor(public router:Router, private datosInicialesService: DatosInicialesExpedientesService) { }

  ngOnInit(): void {
  }

  /*registrarDatosPDE(){
    this.datosInicialesService.addDatosPDE(this.newRegistrarDatos).subscribe(
      res=>{
        console.log(res);
        this.router.navigateByUrl('list-agg-docs-expediente');
        
      },
      err=>console.log(err)
    );

  }*/

}
