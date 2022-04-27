import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';




  

  
 
@Injectable({
  providedIn: 'root'
})
export class DatosInicialesExpedientesService {
  //VARIABLES PARA ALMACENAR LOS ID´S DE LA TABLA DATOS PERSONALES Y ID DE DOMICILIO PARA BUSCAR LOS DATOS Y PODER EDITAR
   Id: String = '';
   IdDomicilio: String = '';
   IdEstudios : String = '';

  //OBJETO PARA ALMACENAR LOS VALORES DE LOS INPUTS DEL COMPONENTE DE REGISTRO FORM TO REGISTRO PERSONA
   ValoresInputsRegistroDataPD:any = {};
   
   
   verSiInputsVacios:any = {};

   var$ = new EventEmitter<any>();

   date: Date = new Date();
  newRegistrarDatos: Datos = {

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
    TABLAS:'0000001',
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


  /*  ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''  */      

       
  }
  
  updateDatos: DatosUpdate = {

    Id: '',
    IdDomicilio: '',
    IdEstudios:  '',
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

    CVE_EMPLEADO:'00000',
    TABLAS:'0000001',
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


  }

 // urlListaNombres = process.env.URLGETLISTARNOMBRES;
  urlListaNombres = 'http://localhost:5000/datospersonales/get';
  urlAgregarDatosPersonalesDomicilio ='http://localhost:5000/datospersonales/post';
  urlEditarDatosPersonalesDomicilio = 'http://localhost:5000/datospersonales/put';

  urlListaNombreSearchByNombre = 'http://localhost:5000/datospersonales/search-by-name';
  urlListaNombreSearchByNomAP ='http://localhost:5000/datospersonales/search-by-name-ap';
  urlListaNombreSearchByNomComplete='http://localhost:5000/datospersonales/search-by-name-complete';

  urlTraerDatosPDByIDParaEditar = 'http://localhost:5000/datospersonales/get-by-ids';
  


  constructor(private http:HttpClient) { }


  //get datos para la lista componente  ver listado personal (list-agg-docs-expediente)
  getListaDeNombresEmpleados(){ 
    return this.http.get(this.urlListaNombres);
  }

  
// busquedas de los inputs 
  getListaNomSearchByNom(nombre:any){
    return this.http.post(this.urlListaNombreSearchByNombre, nombre);
  }
  
  getListaNomSearchByNomAP(nombre:any, aPaterno:any ){
    return this.http.post(this.urlListaNombreSearchByNomAP,nombre,aPaterno);
  }

  getListaNomSearchByNomComplet(nombre:any,aPaterno:any, aMaterno:any){

    return this.http.post(this.urlListaNombreSearchByNomComplete, nombre)
  }
  //---------------------------------------------------------------------------------


  //agregar la info personal y domicilio del componente registrar-usuario  
  addDatosPDE(datos:Datos){
    return this.http.post(this.urlAgregarDatosPersonalesDomicilio,datos);
  }


  //editar datos personales y de domicilio 
  editarDatosPD(datosUpdate:DatosUpdate){
    return this.http.put(this.urlEditarDatosPersonalesDomicilio, datosUpdate);
  } 


  getDatosEmpleadoById(Ids: IdsParaEditarDataPD){
    return this.http.post(this.urlTraerDatosPDByIDParaEditar, Ids);
  }

}

export interface IdsParaEditarDataPD {
  Id: String;
  IdDomicilio: String;
  IdEstudios: String
}

export interface DatosUpdate{
  Id: String;
  IdDomicilio: String;
  IdEstudios: String;

  FECHA_REGISTRO_DATA_PERSONAL : Date;
  ESTATUS: String;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  SEXO: String;
  FECHA_NAC: Date; 
  EST_CIVIL: String;
  
  CVE_RFC: String;
  CURP: String;
  CVE_ELECTOR?: String;
  LICENCIA?: String;

  PASAPORTE?: String;
  CARTILLA?: String;

  PAIS_NAC: Number;
  EDO_NAC: Number;
  MUN_NAC:Number;
  NACIONALIDAD: Number;

  CVE_EMPLEADO: String;
  TABLAS: String;
  FCH_UAC: Date;

  OBSERVACIONES?: String;

  EMAIL:String;
  TELEFONO: String;
  CELULAR: String;

  CALLE: String;
  ENTRE_CALLE: String;
  Y_CALLE: String;

  NO_EXTERIOR: String;
  NO_INTERIOR: String;
  COLONIA: String;
  CODIGO_POSTAL: String;
  ENTIDAD: String;
  MUNICIPIO: String;
  CIUDAD: String
}


 export interface Datos{ 

  FECHA_REGISTRO_DATA_PERSONAL : Date;
  ESTATUS: String;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  SEXO: String;
  FECHA_NAC: Date; 
  EST_CIVIL: String;
  
  CVE_RFC: String;
  CURP: String;
  CVE_ELECTOR?: String;
  LICENCIA?: String;

  PASAPORTE?: String;
  CARTILLA?: String;

  PAIS_NAC: Number;
  EDO_NAC: Number;
  MUN_NAC:Number;
  NACIONALIDAD: Number;

  CVE_EMPLEADO: String;
  TABLAS: String;
  FCH_UAC: Date;

  OBSERVACIONES?: String;

  EMAIL:String;
  TELEFONO: String;
  CELULAR: String;

  CALLE: String;
  ENTRE_CALLE: String;
  Y_CALLE: String;

  NO_EXTERIOR: String;
  NO_INTERIOR: String;
  COLONIA: String;
  CODIGO_POSTAL: String;
  ENTIDAD: String;
  MUNICIPIO: String;
  CIUDAD: String
}




