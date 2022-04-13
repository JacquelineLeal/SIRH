import { Component, OnInit } from '@angular/core';
import {Datos, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {
  date: Date = new Date();
  newRegistrarDatos: Datos = {

    FECHA_REGISTRO_DATA_PERSONAL: this.date,
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
    TABLAS:'0000001',
    FCH_UAC: '2022-04-02',


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


  /*  ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''  */      

      
  }
  constructor(public router:Router, private datosInicialesService: DatosInicialesExpedientesService, public cookieService: CookieService) { }

  ngOnInit(): void {
    console.log(this.newRegistrarDatos);
  }

  registrarDatosPDE(){
    
    this.datosInicialesService.addDatosPDE(this.newRegistrarDatos).subscribe(
      res=>{
        console.log(res);
        this.cookieService.set('Nombre',`${this.newRegistrarDatos.NOMBRE}`);
        this.cookieService.set('ApellidoP',`${this.newRegistrarDatos.APE_PATERNO}`);
        this.cookieService.set('ApellidoM',`${this.newRegistrarDatos.APE_MATERNO}`);
        this.cookieService.set('CveEmpleado',`${this.newRegistrarDatos.CVE_EMPLEADO}`);
        //console.log(this.cookieService.get('Nombre'));
        
        alert("Datos registrados exitosamente");

        this.router.navigateByUrl('registrar-info-escolar');
      
        
       // this.router.navigateByUrl('registrar-info-escolar');
        
      },

      err=>{
        console.log(err);
        alert("Ha ocurrido un error de conexión, favor de intentarlo nuevamente");
      }
    ); 
    

  } 

}
