import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IdsParaEditarDataPD,Datos, DatosInicialesExpedientesService} from '../../services/datos-iniciales-expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-info-personal',
  templateUrl: './edit-info-personal.component.html',
  styleUrls: ['./edit-info-personal.component.scss']
})
export class EditInfoPersonalComponent implements OnInit {
  Nombre = 'name';
  date: Date = new Date();
  arreglo: any = [];

  @Input() arregloParaVerSiEstaVacioLosInputs: any = {};
  @Output() outputParaVerSiEstaVacioLosInputs = new EventEmitter<any>();
 

  

 
  /*  newRegistrarDatos: Datos = {


    FECHA_REGISTRO_DATA_PERSONAL: this.date,
    ESTATUS : '',
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

    CVE_EMPLEADO:'',
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
    //this.traerById();
    console.log(this.datosInicialesService.Id);  
    console.log(this.datosInicialesService.IdDomicilio);
  

  }


 /* async putInfoInicial(){
    await this.datosInicialesService.editarDatosPD(this.datosInicialesService.ValoresInputsRegistroDataPD).subscribe(
      res=>{
        alert('Los cambios fueron guardados correctamente');
        this.router.navigateByUrl('list-agg-docs-expediente');

      },
      err=>{
        console.log(err);
        
      }
    )

  }*/



 /* async traerById(){
    await this.datosInicialesService.getDatosEmpleadoById(this.arregloIdsParaTraerInfo).subscribe(
      res=>{
        //console.log(res);
        this.arreglo = res;
        this.datosInicialesService.newRegistrarDatos = this.arreglo;
        //this.datosInicialesService.var$.emit(this.arreglo);
       // this.arregloParaVerSiEstaVacioLosInputs = res;
       // this.outputParaVerSiEstaVacioLosInputs.emit(this.arregloParaVerSiEstaVacioLosInputs)
       // this.datosInicialesService.verSiInputsVacios = this.arregloParaVerSiEstaVacioLosInputs; 
        console.log('ver-inputs edit');
        
        console.log( this.datosInicialesService.newRegistrarDatos);
      },
      err => {
        console.log(err);

        
      }
      
    )



  
  }*/




}
