import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosPDomComService {

  urlGetListaNombresRegis = 'http://localhost:5000/registro-nombres/get';
  urlPostNombresToDP = 'http://localhost:5000/registro-nombres/post';
  urlGetDataPersonalByCveEmp = 'http://localhost:5000/registro-nombres/get-data-personal-list/';

  constructor(private http:HttpClient) { }

  getListaNombresRegistrar(){
     return this.http.get(this.urlGetListaNombresRegis);
  }

  agregarNombreDP(datos:DatosPersonalesTable){
    return this.http.post(this.urlPostNombresToDP, datos);
  }

  getDatosPersonalesPerExis(CVE_EMPLEADO: any){
    return this.http.get(this.urlGetDataPersonalByCveEmp + CVE_EMPLEADO);

  }




 
}


export interface DatosPersonalesTable{
  FECHA_REGISTRO_DATA_PERSONAL : Date;
 // Id: Number;
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
  INFO_COMPLETA: String;

}
