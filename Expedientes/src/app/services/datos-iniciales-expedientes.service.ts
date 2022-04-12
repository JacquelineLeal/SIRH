import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';





  

@Injectable({
  providedIn: 'root'
})
export class DatosInicialesExpedientesService {
 // urlListaNombres = process.env.URLGETLISTARNOMBRES;
  urlListaNombres = 'http://localhost:5000/datospersonales/get';
  urlAgregarDatosPersonalesDomicilio ='http://localhost:5000/datospersonales/post';
  urlListaNombreSearchByNombre = 'http://localhost:5000/datospersonales/search-by-name';
  urlListaNombreSearchByNomAP ='http://localhost:5000/datospersonales/search-by-name-ap';
  urlListaNombreSearchByNomComplete='http://localhost:5000/datospersonales/search-by-name-complete';
  
  constructor(private http:HttpClient) { }


  //get datos para la lista
  getListaDeNombresEmpleados(){
    return this.http.get(this.urlListaNombres);
  }

  getListaNomSearchByNom(nombre:any){
    return this.http.post(this.urlListaNombreSearchByNombre, nombre);
  }
  
  getListaNomSearchByNomAP(nombre:any, aPaterno:any ){
    return this.http.post(this.urlListaNombreSearchByNomAP,nombre,aPaterno);
  }

  getListaNomSearchByNomComplet(nombre:any,aPaterno:any, aMaterno:any){

    return this.http.post(this.urlListaNombreSearchByNomComplete, nombre)
  }

  addDatosPDE(datos:Datos){
    return this.http.post(this.urlAgregarDatosPersonalesDomicilio,datos);
  }

  editarDatosPDE(id:string, datos:Datos){
    return this.http.put(this.urlListaNombreSearchByNomAP+'/'+ id, datos);
  }





}


export interface Datos{

  FECHA_REGISTRO_DATA_PERSONAL : Date;
  ESTATUS: String;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  SEXO: String;
  FECHA_NAC: String;
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
  FCH_UAC: String;

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


export interface DatosEscolares{

  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;

  CVE_EMPLEADO: String;
  ESCOLARIDAD: String;
  ESCUELA: String;
  ESPECIALIDAD: String;
  CEDULA?: String;
  TRATAMIENTO:String;
  FCH_INICIO?: String;
  FCH_TERMINO?: String
}



