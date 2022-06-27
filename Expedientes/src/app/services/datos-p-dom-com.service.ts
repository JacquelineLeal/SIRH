import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) 
export class DatosPDomComService {

  urlGetListaNombresRegis = environment.urlGetListaNombresRegis ;
  urlPostNombresToDP = environment.urlPostNombresToDP ;
  
  urlGetDataPersonalByCveEmp = environment.urlGetDataPersonalByCveEmp ;

  urlGetDataPersonalTramiteById = environment.urlGetDataPersonalTramiteById;
  urlGetDomicilioByIdEnlace = environment.urlGetDomicilioByIdEnlace;
  urlGetComplementariaByIdEnlace = environment.urlGetComplementariaByIdEnlace;
  urlGetMediaFiliacionByIdEnlace = environment.urlGetMediaFiliacionByIdEnlace;


  url_OP1_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP1_PostDatosPDomComMerdiaFil_Tramite;
  url_OP2_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP2_PostDatosPDomComMerdiaFil_Tramite;
  url_OP3_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP3_PostDatosPDomComMerdiaFil_Tramite;
  url_OP4_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP4_PostDatosPDomComMerdiaFil_Tramite;
  url_OP5_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP5_PostDatosPDomComMerdiaFil_Tramite;
  url_OP6_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP6_PostDatosPDomComMerdiaFil_Tramite;
  url_OP7_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP7_PostDatosPDomComMerdiaFil_Tramite;
  url_OP8_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP8_PostDatosPDomComMerdiaFil_Tramite;

  url_OP9_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP9_PostDatosPDomComMerdiaFil_Tramite;
  url_OP10_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP10_PostDatosPDomComMerdiaFil_Tramite;
  url_OP11_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP11_PostDatosPDomComMerdiaFil_Tramite;
  url_OP12_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP12_PostDatosPDomComMerdiaFil_Tramite;
  url_OP13_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP13_PostDatosPDomComMerdiaFil_Tramite;
  url_OP14_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP14_PostDatosPDomComMerdiaFil_Tramite;
  url_OP15_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP15_PostDatosPDomComMerdiaFil_Tramite;
  url_OP16_PostDatosPDomComMerdiaFil_Tramite = environment.url_OP16_PostDatosPDomComMerdiaFil_Tramite;

 

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

  //--------------------------------------------------

  getDatosPersonalesTramiteById(Id: any){
    return this.http.get(this.urlGetDataPersonalTramiteById + Id);
  }

  getDomicilioByIdEnlace(IdEnlace: any){
    return this.http.get(this.urlGetDomicilioByIdEnlace + IdEnlace);
  }

  getComplementariaByIdEnlace(IdEnlace: any){
    return this.http.get(this.urlGetComplementariaByIdEnlace + IdEnlace);
  }

  getMediaFiliacionByIdEnlace(IdEnlace: any){
    return this.http.get(this.urlGetMediaFiliacionByIdEnlace + IdEnlace);
  }


  //OPCIONES DE INSERTADO DE INFORMACION PERSONAL DEPENDIENDO DE QUE INFO TENGA

  //OPCION 1
  Op1_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP1_PostDatosPDomComMerdiaFil_Tramite, datos);
  }

  //OPCION 2
  Op2_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP2_PostDatosPDomComMerdiaFil_Tramite, datos);
  }

  //OPCION 3
  Op3_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP3_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 4
  Op4_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP4_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 5
  Op5_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP5_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 6
  Op6_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP6_PostDatosPDomComMerdiaFil_Tramite, datos);
  }

  //OPCION 7
  Op7_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP7_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 8
  Op8_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP8_PostDatosPDomComMerdiaFil_Tramite, datos);
  }

  //OPCION 9
  Op9_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP9_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 10
  Op10_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP10_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 11
  Op11_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP11_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 12
  Op12_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP12_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 13
  Op13_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP13_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 14
  Op14_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP14_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 15
  Op15_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP15_PostDatosPDomComMerdiaFil_Tramite, datos);
  }
  //OPCION 16
  Op16_addDatosPDomComMediaFil_Tramite(datos:DatosPersonalesTable){
    return this.http.post(this.url_OP16_PostDatosPDomComMerdiaFil_Tramite, datos);
  }





 
}

//AGG LOS CAMPOS QE FALTAN

export interface DatosPersonalesTable{
 
  INFO_COMPLETA: String;

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

  
}
