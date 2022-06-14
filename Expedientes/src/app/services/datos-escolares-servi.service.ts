import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosEscolaresServiService {

  //urlGetDatosEscolares ='http://localhost:5000/datosescolares/get';
  urlPostDatosEscolares = environment.urlPostDatosEscolares;
  urlGetDatosEscolaresById = environment.urlGetDatosEscolaresById;
  urlPutDatosEscolares = environment.urlPutDatosEscolares;

  urlGetDatosEscolareByIdEnlace = environment.urlGetDatosEscolareByIdEnlace;
  urlGetDatosEscoByCveEmp = environment.urlGetDatosEscoByCveEmp;

  
 

  constructor(private http:HttpClient) { }


  /*traerDatosEscolares(infoEscolar : TraerInfoEscolar){
    return this.http.post(this.urlGetDatosEscolares,infoEscolar);
  }*/

  addInfoEscolar(escolarData: DatosEscolares){
    return this.http.post(this.urlPostDatosEscolares, escolarData);
  }

  getDatosEscolaresById(IdEstudios: any){
    return this.http.get(this.urlGetDatosEscolaresById + IdEstudios);
  }

  editarDatosEscolares(escolarData: DatosEscolares){
    return this.http.put(this.urlPutDatosEscolares, escolarData);
  }
 

  //-----------------------------------------------------------------------------
  //--------------NEW INTERFACE-------------------------------------------------
  //PARA REGISTRO DE LOS CVE EMPLEADO =00000
  GetDatosEscolares(IdEnlace: any){
    return this.http.get(this.urlGetDatosEscolareByIdEnlace + IdEnlace)
  }

  //PARA EDITAR BUSCAR POR CVE EMPLEADO REAL
  GetDatosEscolaresByCveEm(CVE_EMPLEADO: any){
    return this.http.get(this.urlGetDatosEscoByCveEmp + CVE_EMPLEADO)
    //return this.http.post(this.urlGetDatosEscoByCveEmp, CVE_EMPLEADO)
  } 



  

  

}

export interface Cve{
  CVE_EMPLEADO: String
}

export interface DatosEscolares{
  IdEstudios: String;
  IdEnlace: string;
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;
  CONSECUTIVO: Number;

  CVE_EMPLEADO: String;
  ESCOLARIDAD: String;
  ESCUELA: String;
  ESPECIALIDAD: String;
  CEDULA: String;
  TRATAMIENTO:String;
  FCH_INICIO: String;
  FCH_TERMINO: String
}

export interface TraerInfoEscolar{
  NOMBRE:String;
  APE_PATERNO: String;
  APE_MATERNO: String;
}
